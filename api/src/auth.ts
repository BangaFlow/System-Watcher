import { Request, Response } from 'express'
import { SESSION_NAME } from './config'
import { UserDocument } from './models'
// * we will determine if the request session already contains the user_id & we will just double negate it (undifined => false | string => true)
export const isLoggedIn = (req: Request) => !!req.session!.userId

export const logIn = (req: Request, userId: string, role: string) => {
    // ? we used, what we call a not null assertion operator
    req.session!.userId = userId
    req.session!.createdAt = Date.now()
    req.session!.role = role
}

export const logOut = (req: Request, res: Response) =>
    new Promise((resolve, reject) => {
        req.session!.destroy((err: Error) => {
            if (err) reject(err)

            res.clearCookie(SESSION_NAME)

            resolve()
        })
    })

export const markAsVerified = async (user: UserDocument) => {
    user.verifiedAt = new Date()
    await user.save()
}

export const resetPassword = async (user: UserDocument, password: string) => {
    user.password = password
    await user.save()
}