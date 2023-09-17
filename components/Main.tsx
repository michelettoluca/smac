import { supabase } from "../lib/supabase";
import { AppState, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as Device from "expo-device";
import { fetchLatestReservation, updateReservation } from "../api/api";

type HexColor = `#${string}`;

const BACKGROUND_COLORS: Record<Status, HexColor> = {
  wait: "#3FE86F",
  do_not_wait: "#EC4646",
  unknown: "#5778EE",
  timeout: "#FFBF39",
};

const UNKNOWN_MESSAGES = [
  "Bo",
  "Chi lo sa",
  "Questo non ci è dato saperlo",
  "Probabilmente no",
  "Questo è un bel mistero",
  "Incredibile! Ancora non si sa",
];

const TIMEOUT_MESSAGES = [
  "Tempo scaduto",
  "Chi dorme non piglia pesci",
  "L’indecisione è la ladra delle opportunità",
];

const styles = StyleSheet.create({
  statusText: {
    fontFamily: "Rubik One",
    color: "white",
    textAlign: "center",
    fontSize: 156,
  },
  smallStatusText: {
    paddingHorizontal: 32,
    fontSize: 32,
    lineHeight: 32 * 0.9,
    paddingTop: 32 - 32 * 0.9,
  },
  rubikRegular: {
    fontFamily: "Rubik Regular",
  },
  rubikSemiBold: {
    fontFamily: "Rubik SemiBold",
  },
});

const isSara = (Device.brand ?? "").toLowerCase() === "huawei";

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getNextReservationStatus(status: Status): Status {
  switch (status) {
    case "unknown":
      return "wait";

    case "wait":
      return "do_not_wait";

    case "do_not_wait":
      return "wait";

    case "timeout":
      return "timeout";
  }
}

export default function Main() {
  const [reservation, setReservation] = useState<Reservation | undefined>();

  useEffect(() => {
    void fetchReservation();

    const subscription = supabase
      .channel("rt")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (reservation) => setReservation(reservation.new as Reservation),
      )
      .subscribe();

    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active") {
          void fetchReservation();
        }
      },
    );

    return () => {
      void subscription.unsubscribe();
      appStateSubscription.remove();
    };
  }, []);

  async function fetchReservation() {
    const reservation = await fetchLatestReservation();

    setReservation(reservation);
  }

  if (!reservation) {
    return null;
  }
  const toggleStatus = async () => {
    updateReservation(reservation.id, {
      status: getNextReservationStatus(reservation.status),
    });
  };

  return (
    <Pressable
      style={{
        position: "relative",
        flex: 1,
        width: "100%",
        backgroundColor: BACKGROUND_COLORS[reservation.status],
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => isSara && toggleStatus()}
    >
      <View
        style={{
          display: "flex",
          borderColor: "black",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Rubik Regular",
            fontSize: 16,
            marginBottom: 16,
            color: "#FFFFFFCC",
          }}
        >
          Sara mangia a casa?
        </Text>
        {reservation.status === "unknown" && (
          <Text
            style={StyleSheet.compose(
              styles.statusText,
              styles.smallStatusText,
            )}
          >
            {pickRandom(UNKNOWN_MESSAGES)}
          </Text>
        )}

        {reservation.status === "timeout" && (
          <Text
            style={StyleSheet.compose(
              styles.statusText,
              styles.smallStatusText,
            )}
          >
            {pickRandom(TIMEOUT_MESSAGES)}
          </Text>
        )}
        {reservation.status === "wait" && (
          <Text style={styles.statusText}>Sì</Text>
        )}
        {reservation.status === "do_not_wait" && (
          <Text style={styles.statusText}>No</Text>
        )}
      </View>
    </Pressable>
  );
}
