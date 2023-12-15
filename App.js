import "@thirdweb-dev/react-native-compat";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Binance, BinanceTestnet, Mumbai, Polygon } from "@thirdweb-dev/chains";
import {
  ConnectWallet,
  ThirdwebProvider,
  metamaskWallet,
  useSwitchChain,
  walletConnect,
} from "@thirdweb-dev/react-native";
import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { THIRDWEB_CLIENT_ID } from "./config.js";

function AppInner() {
  const [modalVisible, setModalVisible] = useState(false);

  const [logs, setLogs] = useState([]);
  const appendLog = useCallback((log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  }, []);

  const switchChain = useSwitchChain();

  return (
    <SafeAreaView style={styles.container}>
      <ConnectWallet buttonTitle="Connect Wallet Outside of Modal" />

      <ScrollView>
        <Button
          title="Open Connect Wallet Modal"
          onPress={() => setModalVisible(true)}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              title="Close modal"
              onPress={() => setModalVisible(false)}
            />
            <ConnectWallet buttonTitle="Connect Wallet In Modal" />
          </View>
        </Modal>

        {/* <View style={{ gap: 16 }}>
          <TouchableOpacity
            onPress={async () => {
              try {
                await switchChain(80001);
                appendLog("Switched to mumbai");
              } catch (error) {
                appendLog(
                  `Failed to switch to mumbai: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                );
              }
            }}
          >
            <Text>Switch to mumbai</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              try {
                await switchChain(137);
                appendLog("Switched to polygon mainnet");
              } catch (error) {
                appendLog(
                  `Failed to switch to polygon mainnet: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                );
              }
            }}
          >
            <Text>Switch to polygon mainnet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              try {
                await AsyncStorage.clear();
                appendLog("Cleared AsyncStorage");
              } catch (error) {
                appendLog(
                  `Failed to clear AsyncStorage: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                );
              }
            }}
          >
            <Text>Clear AsyncStorage</Text>
          </TouchableOpacity>

          {logs.map((log, index) => {
            return (
              <Text key={String(index)}>
                {index + 1}. {log}
              </Text>
            );
          })}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <ThirdwebProvider
      dAppMeta={{
        name: "Earn Alliance",
        description:
          "Explore new opportunities, find your tribe and achieve more in web3 games",
        logoUrl: "https://www.earnalliance.com/new/pngs/Logo.png",
        url: "https://www.earnalliance.com",
      }}
      supportedChains={[Binance, BinanceTestnet, Mumbai, Polygon]}
      supportedWallets={[metamaskWallet(), walletConnect()]}
      clientId={THIRDWEB_CLIENT_ID}
    >
      <AppInner />
    </ThirdwebProvider>
  );
}
