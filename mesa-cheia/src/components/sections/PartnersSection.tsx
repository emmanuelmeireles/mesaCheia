import { Text, View } from "react-native";

import { styles } from "../../styles";

type PartnersSectionProps = {
  partners: string[];
};

export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
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
  );
}
