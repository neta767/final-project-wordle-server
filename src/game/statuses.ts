export type CharStatus = 'absent' | 'present' | 'correct'

export const getCharStatuses = (
    guesses: string[], solution: string
): { [key: string]: CharStatus } => {
    const charObj: { [key: string]: CharStatus } = {}
    const splitSolution = solution.split('')

    guesses.forEach((word) => {
        word.split('').forEach((letter, i) => {
            if (!splitSolution.includes(letter)) {
                // make status absent
                return (charObj[letter] = 'absent')
            }

            if (letter === splitSolution[i]) {
                //make status correct
                return (charObj[letter] = 'correct')
            }

            if (charObj[letter] !== 'correct') {
                //make status present
                return (charObj[letter] = 'present')
            }
        })
    })
    return charObj
}

export const getGuessesStatuses = (
    guesses: string[], solution: string
): CharStatus[][] => {
    const splitSolution = solution.split('')
    const AllStatuses: CharStatus[][] = []
    guesses.forEach((guess: string) => {
        const splitGuess = guess.split('')

        const solutionCharsTaken = splitSolution.map((_) => false)

        const statuses: CharStatus[] = Array.from(Array(guess.length))

        // handle all correct cases first
        splitGuess.forEach((letter, i) => {
            if (letter === splitSolution[i]) {
                statuses[i] = 'correct'
                solutionCharsTaken[i] = true
                return
            }
        })

        splitGuess.forEach((letter, i) => {
            if (statuses[i]) return

            if (!splitSolution.includes(letter)) {
                // handles the absent case
                statuses[i] = 'absent'
                return
            }

            // now we are left with "present"s
            const indexOfPresentChar = splitSolution.findIndex(
                (x, index) => x === letter && !solutionCharsTaken[index]
            )

            if (indexOfPresentChar > -1) {
                statuses[i] = 'present'
                solutionCharsTaken[indexOfPresentChar] = true
                return
            } else {
                statuses[i] = 'absent'
                return
            }
        })
        AllStatuses.push(statuses)
    })
    return AllStatuses
}

export const checkIfGameWon = (
    guesses: string[], solution: string
): boolean => {
    let returnValue = false;
    guesses.forEach((guess) => {
        if (guess === solution) {
            returnValue = true;
            return;
        }
    })
    return returnValue;
}