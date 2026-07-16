declare namespace NodeJS {
    interface ProcessEnv {
        MODEL: string;
        API_KEY: string;
        BASE_URL: string;
        EMBEDDING_MODEL: string;
        DATABASE_URL: string;
        SMTP_PASSWORD: string;
        NEXT_PUBLIC_WEBAPP_URL: string;
    }
}
