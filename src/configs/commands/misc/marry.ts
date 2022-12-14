const married: string[] = [

]

export function selectRandomImage(): string {
    return married[Math.floor(Math.random() * married.length)]
}