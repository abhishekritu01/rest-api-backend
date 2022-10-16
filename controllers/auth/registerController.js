import Joi from "joi";
import { User } from '../../models'
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt'
import JwtService from "../../services/JwtService";

const registerController = {
    async register(req, res, next) {

        // CHECKLIST
        // [ ] validate the request
        // [ ] Authorise the request
        // [ ] check if user is in the database already
        // [ ] prepare model
        // [ ] store in database
        // [ ] generate jwt token
        // [ ] send response

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        console.log(req.body);
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);  // middleware cath all the error
        }
        // res.json({msg:"hello fro express"})


        // check if user is in the database already
        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                return next(CustomErrorHandler.alreadyExist('This email is already taken.'));
            }
        } catch (err) {
            return next(err);
        }



        const { name, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // prepare the model

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        let access_token;
        let refresh_token;
        try {
            const result = await user.save();
            console.log(result);

            // Token
            access_token = JwtService.sign({ _id: result._id, role: result.role });
            // refresh_token = JwtService.sign({ _id: result._id, role: result.role }, '1y', REFRESH_SECRET);

            // database whitelist
            // await RefreshToken.create({ token: refresh_token });
        } catch (err) {
            return next(err);
        }

        res.json({ msg: "hello from express" })
    }

}
export default registerController