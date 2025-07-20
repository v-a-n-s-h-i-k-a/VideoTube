import {Router} from "express";
import {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,
    getCurrentUser,updateAccountdetails,updateUserAvatar,updateUserCoverImage, getUserChannelProfile,
  getwatchHistory} from '../controllers.js/user.controller.js';
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router=Router()

// router.route("/register").post(registerUser)
// router.route("/login").post(registerUser)
router.post("/register",
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update-account").patch(verifyJWT,updateAccountdetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatar)
router.route("/cover-image").patch(verifyJWT,upload.single("/coverImage"),updateUserCoverImage)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT,getwatchHistory)






export default router
 