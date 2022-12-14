const divorce: string[] = [

]

export function selectRandomImage(): string {
    return divorce[Math.floor(Math.random() * divorce.length)]
}