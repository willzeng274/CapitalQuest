
export default function playSound(sound: string) {
    const audio = new Audio(sound)
    audio.play()
}