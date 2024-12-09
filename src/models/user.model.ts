import {Joi} from 'celebrate'

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})