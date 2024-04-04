import { useState, useContext } from 'react';
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import { SafeAreaView, StyleSheet, View, Image, Text, ImageBackground, ActivityIndicator, Modal } from 'react-native';
import creatPaymentIntent from './apis';
import ButtonComp from './ButtonCamp';
import GlobalContext from './../Component/Screens//Navigation/GlobalContext';
import { doc, updateDoc, getDoc, setDoc, collection } from "firebase/firestore";
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
                        amount: confirmPaymentIntent.paymentIntent.amount,
                        currency: confirmPaymentIntent.paymentIntent.currency,
                        paymentMethodId: confirmPaymentIntent.paymentIntent.paymentMethod,
                        status: confirmPaymentIntent.paymentIntent.status,

                    };
                    console.log("roshshan paymentdetail heere", paymentDetails)
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

            // Store payment details in the Payment collection
            const paymentDocRef = collection(db, "Personal Details", userId, "Payment");
            const paymentDocSnapshot = await getDoc(paymentDocRef);

            if (paymentDocSnapshot.exists()) {
                // If the document already exists, update it
                await updateDoc(paymentDocRef, paymentDetails);
                console.log("Payment details updated successfully:", paymentDetails);
            } else {
                // If the document doesn't exist, create it
                await setDoc(paymentDocRef, paymentDetails);
                console.log("Payment details created successfully:", paymentDetails);
            }



            alert('Profile updated successfully.')
        } catch (error) {
            console.log("Error updating data:", error);
        }
    };


    // const storePaymentDetails = async (paymentDetails) => {
    //     try {
    //         const paymentDocRef = doc(db, "PaymentRecords", userId, paymentDetails.paymentIntentId);
    //         const paymentDocSnapshot = await getDoc(paymentDocRef);

    //         if (paymentDocSnapshot.exists()) {
    //             // If the document already exists, update it
    //             await updateDoc(paymentDocRef, paymentDetails);
    //             console.log("Payment details updated successfully:", paymentDetails);
    //         } else {
    //             // If the document doesn't exist, create it
    //             await setDoc(paymentDocRef, paymentDetails);
    //             console.log("Payment details created successfully:", paymentDetails);
    //         }

    //         // Update the daily limit in the user's document
    //         const userDocRef = doc(db, "Users", userId);
    //         const userDocSnapshot = await getDoc(userDocRef);

    //         if (userDocSnapshot.exists()) {
    //             const currentDailyLimit = userDocSnapshot.data().Payment.DailyLimit;
    //             const updatedDailyLimit = currentDailyLimit + 60;

    //             const updateUser = {
    //                 "Payment.DailyLimit": updatedDailyLimit,
    //             };

    //             await updateDoc(userDocRef, updateUser);
    //             console.log("User daily limit updated successfully:", updatedDailyLimit);
    //         } else {
    //             console.log("User document not found.");
    //         }

    //         alert('Profile updated successfully.');
    //     } catch (error) {
    //         console.log("Error storing payment details:", error);
    //     }
    // };

    const storePaymentDetails = async (paymentDetails) => {
        try {
            const paymentDocRef = doc(db, "PaymentRecords", userId, paymentDetails.paymentIntentId);
            const paymentDocSnapshot = await getDoc(paymentDocRef);

            // Check if the payment document exists, create it if not
            if (!paymentDocSnapshot.exists()) {
                await setDoc(paymentDocRef, {});
                console.log("Payment document created successfully.");
            }

            // Update the daily limit in the user's document
            const userDocRef = doc(db, "Users", userId);
            const userDocSnapshot = await getDoc(userDocRef);

            // Check if the user document exists, create it if not
            if (!userDocSnapshot.exists()) {
                await setDoc(userDocRef, { Payment: { DailyLimit: 0 } });
                console.log("User document created successfully.");
            }

            // Update the payment details
            await updateDoc(paymentDocRef, paymentDetails);
            console.log("Payment details updated successfully:", paymentDetails);

            // Update the user's daily limit
            const currentDailyLimit = userDocSnapshot.data()?.Payment?.DailyLimit || 0;
            const updatedDailyLimit = currentDailyLimit + 60;
            const updateUser = {
                Payment: { DailyLimit: updatedDailyLimit },
            };

            await updateDoc(userDocRef, updateUser);
            console.log("User daily limit updated successfully:", updatedDailyLimit);

            alert('Profile updated successfully.');
        } catch (error) {
            console.log("Error storing payment details:", error);
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