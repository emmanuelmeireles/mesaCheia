import { useEffect, useMemo, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthScreen } from "./src/features/auth/AuthScreen";
import { DashboardScreen } from "./src/features/dashboard/DashboardScreen";
import { MapScreen } from "./src/features/map/MapScreen";
import { MaterialScreen } from "./src/features/materials/MaterialScreen";
import { OnboardingScreen } from "./src/features/onboarding/OnboardingScreen";
import { PartnersScreen } from "./src/features/partners/PartnersScreen";
import { ProfileScreen } from "./src/features/profile/ProfileScreen";
import { TradeScreen } from "./src/features/trade/TradeScreen";
import {
  initialMaterialEntries,
  initialUsers,
  materialCatalog,
  type MaterialEntry,
  type User,
} from "./src/data/mockData";
import { STORAGE_KEYS, readJson, writeJson } from "./src/storage/storage";
import { calculatePoints } from "./src/utils/points";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<MaterialEntry[]>(initialMaterialEntries);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function loadPersistedState() {
      const [storedOnboarding, storedUser, storedUsers, storedEntries] = await Promise.all([
        readJson<boolean>(STORAGE_KEYS.onboarding, false),
        readJson<User | null>(STORAGE_KEYS.sessionUser, null),
        readJson<User[]>(STORAGE_KEYS.users, initialUsers),
        readJson<MaterialEntry[]>(STORAGE_KEYS.entries, initialMaterialEntries),
      ]);

      setHasSeenOnboarding(storedOnboarding);
      setCurrentUser(storedUser);
      setUsers(storedUsers);
      setEntries(storedEntries);
      setIsHydrated(true);
    }

    void loadPersistedState();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void writeJson(STORAGE_KEYS.onboarding, hasSeenOnboarding);
  }, [hasSeenOnboarding, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void writeJson(STORAGE_KEYS.sessionUser, currentUser);
    void writeJson(STORAGE_KEYS.users, users);
    void writeJson(STORAGE_KEYS.entries, entries);
  }, [currentUser, entries, isHydrated, users]);

  const userEntries = useMemo(
    () => entries.filter((entry) => entry.userId === currentUser?.id),
    [entries, currentUser],
  );

  const totalRecyclingKg = userEntries.reduce((sum, entry) => sum + entry.weightKg, 0);

  const thisMonthPoints = userEntries.reduce((total, entry) => {
    const createdAt = new Date(entry.createdAt);
    const now = new Date();

    if (
      createdAt.getMonth() === now.getMonth() &&
      createdAt.getFullYear() === now.getFullYear()
    ) {
      return total + entry.pointsEarned;
    }

    return total;
  }, 0);

  function handleLogin(email: string, password: string) {
    const foundUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
    );

    if (foundUser) {
      setCurrentUser(foundUser);
    }
  }

  function handleRegister(name: string, email: string, password: string, city: string) {
    const alreadyExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

    if (alreadyExists || !name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      city,
      points: 0,
    };

    setUsers((previousUsers) => [...previousUsers, newUser]);
    setCurrentUser(newUser);
  }

  function handleMaterialSubmit(materialId: string, weightKg: number) {
    if (!currentUser || weightKg <= 0) {
      return;
    }

    const material = materialCatalog.find((item) => item.id === materialId);

    if (!material) {
      return;
    }

    const pointsEarned = calculatePoints(material, weightKg);
    const newEntry: MaterialEntry = {
      id: `entry-${Date.now()}`,
      userId: currentUser.id,
      materialId,
      weightKg,
      pointsEarned,
      createdAt: new Date().toISOString(),
    };

    const updatedUser: User = {
      ...currentUser,
      points: currentUser.points + pointsEarned,
    };

    setEntries((previousEntries) => [newEntry, ...previousEntries]);
    setUsers((previousUsers) =>
      previousUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setCurrentUser(updatedUser);
  }

  const dashboardHighlights = useMemo(() => {
    const materialSummary = materialCatalog
      .map((material) => ({
        name: material.name,
        total: userEntries
          .filter((entry) => entry.materialId === material.id)
          .reduce((sum, entry) => sum + entry.weightKg, 0),
      }))
      .sort((left, right) => right.total - left.total);

    const favoriteMaterial = materialSummary[0]?.total ? materialSummary[0].name : "Nenhum";

    return [
      { label: "Reciclado", value: `${totalRecyclingKg.toFixed(1)} kg` },
      { label: "Material favorito", value: favoriteMaterial },
      { label: "Pontos do mês", value: `${thisMonthPoints} pts` },
    ];
  }, [thisMonthPoints, totalRecyclingKg, userEntries]);

  if (!isHydrated) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasSeenOnboarding ? (
          <Stack.Screen
            name="Onboarding"
            children={() => (
              <OnboardingScreen onFinish={() => setHasSeenOnboarding(true)} />
            )}
          />
        ) : null}

        {!currentUser && hasSeenOnboarding ? (
          <Stack.Screen
            name="Auth"
            children={() => (
              <AuthScreen onLogin={handleLogin} onRegister={handleRegister} />
            )}
          />
        ) : null}

        {currentUser && hasSeenOnboarding ? (
          <Stack.Screen name="Main">
            {() => (
              <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                  name="Dashboard"
                  children={() => (
                    <DashboardScreen
                      entriesCount={userEntries.length}
                      highlights={dashboardHighlights}
                      points={currentUser.points}
                      thisMonthPoints={thisMonthPoints}
                      userName={currentUser.name.split(" ")[0]}
                    />
                  )}
                />
                <Tab.Screen
                  name="Material"
                  children={() => (
                    <MaterialScreen entries={userEntries} onSubmit={handleMaterialSubmit} />
                  )}
                />
                <Tab.Screen
                  name="Trade"
                  children={() => <TradeScreen points={currentUser.points} />}
                />
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Partners" component={PartnersScreen} />
                <Tab.Screen
                  name="Profile"
                  children={() => (
                    <ProfileScreen
                      city={currentUser.city}
                      email={currentUser.email}
                      name={currentUser.name}
                      points={currentUser.points}
                      totalRecyclingKg={totalRecyclingKg}
                    />
                  )}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

