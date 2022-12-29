import { createCanvas, loadImage, Image, GlobalFonts } from "@napi-rs/canvas";
import { User, Client, AttachmentBuilder } from "discord.js";
import { request } from "undici";
import userSchema from "../../db/models/user";
import path from "path";
import lang from "../../languages/languages";

function selectRandomColor(): string {
    const colorsHexes: string[] = [
        "#25b5af",
        "#111111",
        "#85144b",
        "#f012be",
        "#b10dc9",
        "#39cccc",
        "#7fdbff",
        "#110378",
        "#006666",
        "#c6093b",
        "#e2b8ff",
        "#c67cfb",
        "#b76aed",
        "#fb8a8a",
        "#ffa4a4"
    ]

    return colorsHexes[Math.floor(Math.random() * colorsHexes.length)]
}

export async function marriageCanva(user1: User, user2: User, client: Client) {
    const canvas = createCanvas(1920, 1080);
    const context = canvas.getContext("2d");
    const userDb = await userSchema.findOne({ _id: user1.id });
    const customBackground = userDb!.account_settings.customMarriageBackgroundName;

    let bg: string;
    if (customBackground) {
        bg = path.join("src/configs/images/custom/marriages/" + customBackground + ".jpg");
    } else {
        bg = path.join("src/configs/images/defaults/marriedBackground.jpg");
    }

    const background = await loadImage(bg);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = selectRandomColor()
    context.strokeRect(0,0, canvas.width, canvas.height)


    const {body: user1Avatar} = await request(client.users.cache.get(user1.id)!.displayAvatarURL({forceStatic: true, size: 1024}))
    const {body: user2Avatar} = await request(client.users.cache.get(user2.id)!.displayAvatarURL({forceStatic: true, size: 1024}))
    const userOneAvatar = new Image()
    userOneAvatar.src = Buffer.from(await user1Avatar.arrayBuffer())

    const userTwoAvatar = new Image()
    userTwoAvatar.src = Buffer.from(await user2Avatar.arrayBuffer())
    
    await loadImage(userTwoAvatar).then((image) => {
        context.restore()
        context.beginPath();
        context.arc(1620, 540, 200, 0, Math.PI * 2, true);
        context.save()
        context.clip();
        context.drawImage(image, 1420, 340, 400, 400)
    })

    await loadImage(userOneAvatar).then((image) => {
        context.restore()
        context.beginPath();
        context.arc(300, 540, 200, 0, Math.PI * 2, true);
        context.closePath();
        context.save()
        context.clip();
        context.drawImage(image, 100, 340, 400, 400)
    })

    GlobalFonts.registerFromPath(path.join("src/configs/fonts/DancingScript/DancingScript-Bold.ttf"), "dancing")

    context.restore()
    context.font = "bold 100px dancing";
    context.fillStyle = "#ff3377";
    context.textAlign = "center";
    context.fillText(user1.username, 300, 900);
    context.fillText(user2.username, 1620, 900);
    context.fillText(userDb!.marriedTo!.marryDate!, 960, 700);

    context.font = "bold 150px dancing";
    context.fillText("💘", 960, 540);

    return new AttachmentBuilder(canvas.toBuffer("image/jpeg"), {
        name: "marriage.jpg",
    })
    
}

export async function userInfoCanva(user: User) {
    const canvas = createCanvas(1920, 1080);
    const context = canvas.getContext("2d");
    const userDb = await userSchema.findOne({ _id: user.id });
    const customBackground = userDb!.account_settings.customMarriageBackgroundName;

    let bg: string;
    if (customBackground) {
        bg = path.join("src/configs/images/custom/profiles/" + customBackground + ".jpg");
    } else {
        bg = path.join("src/configs/images/defaults/profileBackground.jpg");
    }

    const background = await loadImage(bg);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.strokeStyle = selectRandomColor()
    context.strokeRect(0,0, canvas.width, canvas.height)
}