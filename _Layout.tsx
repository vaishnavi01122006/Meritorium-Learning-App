import { Tabs } from "expo-router";
export  default function AuthRoutesLayout()
{
    return(
        <Tabs>
            <Tabs.Screen name="Login"/>
            <Tabs.Screen name="settings"/>
        </Tabs>
    )
}