


const colors = {
    textColors: {
        white: "white",
        red: "red",
        primary: "#EE7214",
        black: "black",
        grey: "#C8C8C8",
        white: "#ffffff",
        orange: "#FFB000"
    },
    buttonColors: {
        primary: "#EE7214",
        red: "red",
        black: "black",
        grey: "#C8C8C8",

        white: "#ffffff",
        borderColor: "#F5F5DC"
    },

    buttonText: {
        primary: "#EE7214",
        red: "red",
        black: "black",
        grey: "#C8C8C8",

        white: "#ffffff"
    }
};


const inputText = {
    fontSize: 20,
    color: colors.textColors.white
}

const titles = {
    titleSize: 30,
    btnTextSize: 20
};

const mainTitle = {
    fontSize: 40,
    color: colors.textColors.orange,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: 'bold'

};
const transparentButton = {

    width: "80%",
    height: 60,
    backgroundColor: "none",
    borderRadius: 7.5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.buttonColors.borderColor,
    borderWidth: 2,


};


const ButtonColorAndFontSize = {
    fontSize: 25,
    color: colors.buttonText.white

}


const PrimaryButton = {
    fontSize: 20,
    color: colors.buttonText.white,
    textAlign: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    fontWeight: "700",
    backgroundColor: colors.buttonColors.primary,
    borderRadius: 10,
    padding: 10,
    margin: "auto",
    paddingHorizontal: 50
};

const NormalText = {
    fontSize: 18,
    color: colors.textColors.white,
    textAlign: "center",
    width: "80%",
    paddingTop: 10,
    paddingBottom: 5

}

const HorizentalLine = {
    width: "80%",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    marginVertical: 20
};


const solidButton = {
    width: "80%",
    height: 70,
    backgroundColor: colors.buttonColors.primary,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.buttonColors.borderColor,
    borderWidth: 2,
    fontSize: 23,
    color: colors.buttonText.white,
};

const Styles = {

    welcomeScreenBg: require("../assets/images/WelcomeScreenBg.jpg"),
    forgotPasswordBg: require("../assets/images/forgotPasswordBg.jpg"),
    SignUpScreenBg: require("../assets/images/RegisterBg.jpg"),
    LogInScreenBg: require("../assets/images/LoginBg.jpg"),
    resetSuccessBg: require("../assets/images/resetSuccessBg.jpg"),
    dualCameraicon: require("../assets/images/dualCamera.png"),
    UploadFileIcon: require("../assets/images/FileUploadIcon.png"),
    UploadImageIcon: require("../assets/images/ImageUpload.png"),
    DeleteBinIcon: require("../assets/images/delete.png"),
    ProfileIcon: require("../assets/images/user.png"),
    chatBotIcon: require("../assets/images/chatbot.png"),
    GroceriesIcon: require("../assets/images/groceries.png"),
    subscriptionIcon: require("../assets/images/credit-cards.png"),
    Ingredientbg: require("../assets/images/IngredientImage.jpg"),
    panfry: require("../assets/images/Panfry.png"),
    SettingIcon: require("../assets/images/settings.png"),
    HomeIcon: require("../assets/images/home.png"),
    MainHomeIcon: require("../assets/images/MainHomeIcon.png"),

    

    colors,
    mainTitle,
    titles,
    PrimaryButton,
    transparentButton,
    NormalText,
    HorizentalLine,
    solidButton,
    ButtonColorAndFontSize,
    inputText

};

export default Styles;
