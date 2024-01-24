"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You’re a world-renowned chef known for creating delicious meals. You’re currently competing in Top Chef and provided a fridge of the following ingredients: onion, garlic, beansprouts, eggs, ribeye, squash, kimchi, mushrooms, miso, dumplings.Given these ingredients, you’re tasked with the mission of creating a dish for the judges. The prize is $10,000. What is the recipe for the disk that you are creating? Be specific with the amount of an ingredient, how many servings the recipe is for, and the steps for cooking. In addition, provide a small description with the title.",
                },
            ],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0]);
    });
}
main();
