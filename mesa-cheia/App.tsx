<<<<<<< HEAD
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
=======
import { useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
>>>>>>> cf121c5 (Meus ajustes locais antes do pull)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
<<<<<<< HEAD
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<MaterialEntry[]>(initialMaterialEntries);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
=======
  const scrollViewRef = useRef<ScrollView>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sectionOffsets, setSectionOffsets] = useState<Record<string, number>>({});
>>>>>>> cf121c5 (Meus ajustes locais antes do pull)

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

<<<<<<< HEAD
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
=======
  function scrollToSection(section: "how-it-works" | "waitlist") {
    const offset = sectionOffsets[section];

    if (offset !== undefined) {
      scrollViewRef.current?.scrollTo({ y: Math.max(offset - 16, 0), animated: true });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            Troca<Text style={styles.logoAccent}>verde</Text>
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => scrollToSection("waitlist")}
            style={styles.outlineButton}
          >
            <Text style={styles.outlineButtonText}>Entrar na lista</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
        
          <Text style={styles.eyebrow}>UM APP PRA RECICLAGEM QUE ALIMENTA</Text>
          <Text style={styles.heroTitle}>
            Recicle.{"\n"}Troque.{"\n"}
            <Text style={styles.orangeText}>Coma.</Text>
          </Text>
          <Text style={styles.heroDescription}>
            Leve seus recicláveis limpos até um ponto de troca parceiro e volte
            pra casa com frutas, legumes e verduras frescas, na hora.
          </Text>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => scrollToSection("waitlist")}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Entrar na lista de espera</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => scrollToSection("how-it-works")}
              style={styles.outlineButton}
            >
              <Text style={styles.outlineButtonText}>Ver como funciona</Text>
            </Pressable>
          </View>
          <View style={styles.stamp} accessibilityElementsHidden>
            <Text style={styles.stampText}>2KG ♻️</Text>
            <Text style={styles.stampEquals}>=</Text>
            <Text style={styles.stampText}>1KG 🥬</Text>
          </View>
        </View>

        <View
          onLayout={(event) =>
            setSectionOffsets((current) => ({
              ...current,
              "how-it-works": event.nativeEvent.layout.y,
            }))
          }
          style={styles.section}
          nativeID="how-it-works"
        >
          <Text style={styles.sectionLabel}>COMO FUNCIONA</Text>
          <View style={styles.steps}>
            {steps.map((step) => (
              <View key={step.number} style={styles.step}>
                <Text style={styles.stepNumber}>{step.number}</Text>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.bodyText}>{step.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.goals}>
          <Text style={styles.sectionLabel}>METAS DO PILOTO</Text>
          <View style={styles.goalGrid}>
            <Goal value="500+" label="famílias no primeiro bairro" />
            <Goal value="10" label="pontos de troca parceiros" />
            <Goal value="5t" label="de recicláveis coletados por mês" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FEITO JUNTO COM</Text>
          <View style={styles.partnerList}>
            {partners.map((partner) => (
              <View key={partner} style={styles.partnerTag}>
                <Text style={styles.partnerText}>{partner}</Text>
              </View>
            ))}
          </View>
        </View>

        <View
          onLayout={(event) =>
            setSectionOffsets((current) => ({
              ...current,
              waitlist: event.nativeEvent.layout.y,
            }))
          }
          style={styles.cta}
          nativeID="waitlist"
        >
          <Text style={styles.ctaTitle}>Quer levar o Trocaverde pro seu bairro?</Text>
          <Text style={styles.bodyText}>
            Deixe seu e-mail e avisamos assim que abrirmos um ponto de troca perto de você.
          </Text>
          {submitted ? (
            <Text style={styles.successText}>E-mail recebido. Obrigado!</Text>
          ) : (
            <View style={styles.form}>
              <TextInput
                accessibilityLabel="Seu e-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="seu@email.com"
                placeholderTextColor="rgba(246, 241, 228, 0.4)"
                style={styles.input}
                value={email}
              />
              <Pressable
                accessibilityRole="button"
                onPress={submitEmail}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Entrar na lista</Text>
              </Pressable>
            </View>
          )}
        </View>

        <Text style={styles.footer}>Trocaverde - reciclagem que vira comida.</Text>
      </ScrollView>
    </SafeAreaView>
>>>>>>> cf121c5 (Meus ajustes locais antes do pull)
  );
}

