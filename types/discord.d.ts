import "discord.js";
import OpenAI from "openai";

import Polyglot from "../src/configs/handlers/language/LanguageHandler";

declare module "discord.js" {
    export interface Client {
        openai: OpenAI;
        translation: Polyglot["getTranslation"];
    }
    export interface User {
        lang: Polyglot["userLanguage"][User["id"]];
    }
}
