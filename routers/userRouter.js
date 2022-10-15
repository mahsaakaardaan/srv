const router = require("express").Router();
const User = require("../models/userModel");
const Setting = require("../models/settingModel");

//register
router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const newUser = new User({
      userName,
      password,
    });
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(401)
        .send({ errMess: "این نام کاربری وجود دارد." });
    }else if(userName == "" || password == ""){
      res.status(400).send({errMess: "همه موارد را وارد کنید."})
    }
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName });
    if (!userName || !password) {
      return res
        .status(400)
        .send({ errMess: "همه موارد را وارد کنید." });
    }  if (!existingUser) {
      return res
        .status(401)
        .send({ errMess: "نام کاربری یافت نشد." });
    }  if (password !== existingUser.password) {
      return res
        .status(405)
        .send({ errMess: "نام کاربری یا پسورد اشتباه است." });
    }

    res.status(200).json(existingUser).send(existingUser);
  } catch (error) {
    res.status(400)
  }
});

//get user

router.post("/oneUser", async (req, res) => {
  try {
    const { userName } = req.body;
    const existingUser = await User.findOne({ userName });
    res.status(200).send(existingUser);
  } catch (error) {
    console.log("er", error);
  }
});

//setting configuration

router.post("/setting", async (req, res) => {
  try {
    const {
      userId,
      apiKey,
      minTemp,
      maxTemp,
      minHum,
      maxHum,
      sensive,
      phoneNumber,
    } = req.body;
    const existingUser = await User.findOne({ userId });
    if (!apiKey) {
      res
        .status(400)
        .send({ errMess: "کلید را باید وارد کنید." });
    } else if (phoneNumber == "") {
      res
        .status(400)
        .send({ errMess: "شماره تلفن را باید وارد کنید." });
    }

    const newSetting = new Setting({
      userId: existingUser._id, 
      apiKey,
      minTemp,
      maxTemp,
      minHum,
      maxHum,
      sensive,
      phoneNumber,
    });

    const existSet = await Setting.findOne({ apiKey });

    if (!existSet) {
      const savedSetting = await newSetting.save();
      res.status(200).send(savedSetting);
    } else if (existSet) {
      console.log("gg");
      await Setting.findOneAndDelete({ apiKey });
      const savedSetting = await newSetting.save();
      res.status(200).send(savedSetting);
    }

    console.log(existingUser);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

//get last setting

router.post("/lastSet", async (req, res) => {
  const { userId } = req.body;
  const existSetting = await Setting.findOne({ userId });
  console.log('uuuuuuuuuuu',userId)
  try {
    if(existSetting){
      res.status(200).send(existSetting);
    }else{
      res.send("no")
    }
      
    
  } catch (error) {
    console.log('rrr',error)
  }
});

//get one setting
router.get("/getlastsetting",async(req,res) => {
  try {
    const oneSetting = await Setting.findOne()
    res.status(200).send(oneSetting)
  } catch (error) {
    res.status(500).send({errMess: "an error"})
  }
})

module.exports = router;
