import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,ActivityIndicator,Animated } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState,useEffect,useRef } from "react";
import axios from "axios";

const Details = () => {
    //userData to store the Data from Public Api
    const [userData, setUserData] = useState([]);
    //This was a simple loader which make user hold untill all the data loaded
    const [loading, setLoading] = useState(true);
    // Fetches user data from the API when the app starts.
    // The data is retrieved inside useEffect to ensure it loads automatically on initial render.
    // This approach ensures the data is available as soon as the app opens, improving user experience.
    useEffect(() => {
        axios.get("https://random-data-api.com/api/users/random_user?size=80")
            .then(response => {
               // Accessing only the necessary data
                const filteredData = response.data.map(user => ({
                    id: user.id,
                    uid: user.uid,
                    first_name: user.first_name,
                    last_name:user.last_name,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    avatar: user.avatar
                }));
                setUserData(filteredData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);
    const [currentIndex, setCurrentIndex] = useState(0);
    //A Small Animation while user was moving between next and previous
    const slideAnim = useRef(new Animated.Value(0)).current;
    const animateTransition = (direction) => {
        Animated.timing(slideAnim, {
            toValue: direction === 'next' ? -330 : 330,
            duration: 500,
            useNativeDriver: true, 
        }).start(() => {
            slideAnim.setValue(0); 
        });
    };

    //Handling Next function
    const handleNext = () => {
        animateTransition('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % userData.length);
    };

    //Handling Previous function
    const handlePrev = () => {
        animateTransition('prev');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + userData.length) % userData.length);
    };
    
    const currentUser = userData[currentIndex];

    //Just a Small Loader to Engange user utill data Loads
    if (loading) {
        return <ActivityIndicator size="large" color="#4CAF50" />;
    }

    return (
        <View style={styles.Screen}>
             <Animated.View 
                style={[
                    styles.GlassBackground,
                    { transform: [{ translateX: slideAnim }] }
                ]}
            >
                <View style={styles.ImageContainer}>
                    
                    <Image source={{ uri: currentUser.avatar }} style={styles.Image} />
                </View>
                <View style={styles.IDContainer}>
                    <View style={styles.IDBox}>
                        <Ionicons name="id-card" size={20} color="#fff" />
                        <Text style={styles.Data}>ID: {currentUser.id}</Text>
                    </View>
                </View>

                <View style={styles.FullDetails}>
                    {[
                        { field: "Username", value: currentUser.username },
                        {field:"UID",value:currentUser.uid},
                        { field: "Firstname", value: currentUser.first_name },
                        {field:'Lastname',value:currentUser.last_name},
                        { field: "Email", value: currentUser.email },
                        { field: "Password", value: currentUser.password }
                    ].map((item, index) => (
                        <View style={styles.Single} key={index}>
                            <MaterialIcons 
                                name={
                                    item.field === "Firstname" ? "person" :
                                    item.field==="Lastname"? "person-outline":
                                    item.field==="UID" ? 'key':
                                    item.field === "Username" ? "person-outline" :
                                    item.field === "Email" ? "email" : "lock"
                                } 
                                size={24} 
                                color="#fff" 
                            />
                            <View style={styles.innerdetails}>
                                <Text style={styles.heading}>{item.field}</Text>
                                <Text style={styles.Data}>{item.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Animated.View>
            <View style={styles.Navigation}>
                <TouchableOpacity style={styles.button} onPress={handlePrev}><FontAwesome name="arrow-left" size={20} color="white" /><Text style={styles.buttonText}> Previous</Text></TouchableOpacity>
                <Text style={styles.userIndex}>{currentIndex+1}</Text>
                <TouchableOpacity style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>Next </Text><FontAwesome name="arrow-right" size={20} color="white" /></TouchableOpacity>
            </View>
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    Screen: {
        flex: 10,
        flexDirection: "column",
        backgroundColor: "#0F172A",
        padding:5,
    },
    GlassBackground: {
        flex: 9,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 20,
        margin:5,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        
    },
    Navigation: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 15,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 30,
        margin:5,
    },
    ImageContainer: {
        alignSelf: "center",
        width: 140,
        height: 140,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "rgba(255, 255, 255, 0.3)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    Image: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
    },
    IDContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 15,
    },
    IDBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    FullDetails: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 10,
        borderRadius: 15,
        rowGap: 8,
    },
    Single: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    innerdetails: {
        width: "75%",
    },
    heading: {
        fontSize: 11,
        color: "#D1D5DB",
        fontWeight: "bold",
    },
    Data: {
        fontSize:14,
        fontWeight: "bold",
        color: "#F1F5F9",
    },
    button: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        elevation: 3,
        alignItems: "center",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        gap: 5,
        width: 100,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    userIndex: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
        width:40,
        borderRadius: 100,
        padding:5,
        textAlign: "center",
        borderWidth:3,
        borderColor: "rgba(255, 255, 255, 0.2)",
    },
});