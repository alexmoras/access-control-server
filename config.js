module.exports = {
    database: {
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    },
    oauth: {
        token_url: process.env.OAUTH_TOKEN_URL,
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        redirect_url: process.env.OAUTH_REDIRECT_URL,
        userinfo_url: process.env.OAUTH_USERINFO_URL
    },
    session: process.env.SESSION_KEY,
    offline_groups: ["staff", "exec"]
}