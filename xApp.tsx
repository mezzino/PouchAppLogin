import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { supabase } from './lib/supabase'

export default function Login() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8 }}>Sign in</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8 }}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email} onChangeText={setEmail}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 8 }}
        placeholder="Password"
        secureTextEntry
        value={password} onChangeText={setPassword}
      />
      <Button title="Sign in" onPress={async () => {
        const { ok, error } = await signIn(email, password);
        if (ok) router.replace("./(tabs)/home"); else alert(error ?? "Sign-in failed");
      }} />
      <Button title="Create account" onPress={async () => {
        const { ok, error } = await signUp(email, password);
        if (ok) alert("Account created. Now sign in."); else alert(error ?? "Sign-up failed");
      }} />
    </View>
  );
}
