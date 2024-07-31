export interface WebAppUser {
    /**
     * A unique identifier for the user or bot. This number may have more than 32
     * significant bits and some programming languages may have difficulty/silent defects
     * in interpreting it. It has at most 52 significant bits, so a 64-bit integer or a
     * double-precision float type is safe for storing this identifier.
     */
    readonly id: number
    /**
     * *True*, if this user is a bot. Returns in the receiver field only.
     */
    readonly is_bot?: boolean
    /**
     * First name of the user or bot.
     */
    readonly first_name: string
    /**
     * Last name of the user or bot.
     */
    readonly last_name?: string
    /**
     * Username of the user or bot.
     */
    readonly username?: string
    /**
     * IETF language tag of the user's language. Returns in user field only.
     */
    readonly language_code?: string
    /**
     * *True*, if this user is a Telegram Premium user
     */
    readonly is_premium?: true
    /**
     * *True*, if this user added the bot to the attachment menu.
     */
    readonly added_to_attachment_menu?: true
    /**
     * *True*, if this user allowed the bot to message them.
     */
    readonly allows_write_to_pm?: true
    /**
     * URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. Only
     * returned for Web Apps launched from the attachment menu.
     */
    readonly photo_url?: string
}


export function getTelegramUser(): WebAppUser | undefined {
    return Telegram.WebApp.initDataUnsafe.user;
}

export function getTelegramId(): number | undefined {
    return getTelegramUser()?.id;
}