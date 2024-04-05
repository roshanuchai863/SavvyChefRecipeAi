import { useState, useContext } from 'react';
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import { SafeAreaView, StyleSheet, View, Image, Text, ImageBackground, ActivityIndicator, Modal } from 'react-native';
import creatPaymentIntent from './apis';
import ButtonComp from './ButtonCamp';
import GlobalContext from './../Component/Screens//Navigation/GlobalContext';
import { doc, updateDoc, getDoc, setDoc, addDoc ,Collection,arrayUnion } from "firebase/firestore";
import { db } from "./../Firebase/Config";
import GbStyle from "./../Global/Styles";
import { TouchableOpacity } from 'react-native-gesture-handler';

const PaymentScreen = () => {
    const [cardInfo, setCardInfo] = useState(null)
    const { userData, userId } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [subcribeAmount, setSubcribeAmount] = useState("20");
    const [showModal, setShowModal] = useState(false);


    const fetchCardDetail = (cardDetail) => {
        // console.log("my card details", cardDetail)
        if (cardDetail.complete) {
            setCardInfo(cardDetail)
        } else {
            setCardInfo(null)
        }
    }


    const onDone = async () => {
        setLoading(true);
        setShowModal(true);
        let apiData = {
            amount: 2000,
            email: userData.email
        }

        try {
            const res = await creatPaymentIntent(apiData);
            console.log("Payment intent created successfully:", res);

            if (res?.data?.paymentIntent) {
                const confirmPaymentIntent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' });
                console.log("Confirm Payment Intent response:", confirmPaymentIntent);

                if (confirmPaymentIntent.paymentIntent && confirmPaymentIntent.paymentIntent.status === 'Succeeded') {

                    const paymentDetails = {
                        paymentIntentId: confirmPaymentIntent.paymentIntent.id,
                        amount: confirmPaymentIntent.paymentIntent.amount/100,
                        currency: confirmPaymentIntent.paymentIntent.currency,
                        dateAndTime: new Date(confirmPaymentIntent.paymentIntent.created * 1),
                        last4digit: confirmPaymentIntent.paymentIntent.paymentMethod.Card.last4,
                        status: confirmPaymentIntent.paymentIntent.status,
                        PaymentEmail: userData.email

                    };
                   
                    await updateData(paymentDetails);
                 
                    alert("Payment successful!");
                } else {
                    const paymentError = confirmPaymentIntent.error?.message || "Unknown error occurred during payment.";
                    alert("Payment failed: " + paymentError);
                }
            }
        } catch (error) {
            console.log("Error during payment intent:", error);
            const errorMessage = error.response?.data?.error?.message || "An unknown error occurred during payment.";
            alert("Error: " + errorMessage);
        }
        finally {
            setLoading(false)
            setShowModal(false);
        }


    }


    const updateData = async (paymentDetails) => {
        try {
            // Update the daily limit in the user's document
            const currentDailyLimit = userData.dailyLimit;
            const updatedDailyLimit = currentDailyLimit + 60;
            const updateUser = {
                "Payment.DailyLimit": updatedDailyLimit,
                
            };

           

            const userDocRef = doc(db, "Personal Details", userId);
            await updateDoc(userDocRef, updateUser);
            await updateDoc(userDocRef, { paymentDetails: arrayUnion(paymentDetails) });
            
        } catch (error) {
            console.log("Error updating data:", error);
        }
    };


   
    


    return (

        <ImageBackground source={GbStyle.AtmIcon} style={styles.MainContainer} blurRadius={2} resizeMode='cover'>
            <SafeAreaView style={{ flex: 1 }} >
                <View style={styles.ContentContainer}>


                    <View style={{ padding: 16 }}>
                        <View>
                            <Text style={[GbStyle.mainTitle, { color: "#fff", }]}>Total Price</Text>

                            <Text style={[GbStyle.mainTitle, { color: "#fff" }]}>${subcribeAmount}</Text>

                        </View>

                        <CardField
                            postalCodeEnabled={false}
                            placeholders={{
                                number: '4242 4242 4242 4242',
                            }}

                            cardStyle={{
                                backgroundColor: '#FFFFFF',
                                textColor: '#000000',
                            }}
                            style={{
                                width: '100%',
                                height: 50,
                                marginVertical: 30,
                            }}
                            onCardChange={(cardDetails) => {
                                fetchCardDetail(cardDetails)
                            }}
                            onFocus={(focusedField) => {
                                console.log('focusField', focusedField);
                            }}

                        />


                        <ButtonComp
                            onPress={onDone}
                            disabled={!cardInfo}
                        />

                        <Modal
                            visible={showModal}
                            animationType="fade"
                            transparent={true}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                    <Text style={styles.modalText}>Payment is processing...</Text>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>

            </SafeAreaView>

        </  ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    ContentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PaymentScreen;