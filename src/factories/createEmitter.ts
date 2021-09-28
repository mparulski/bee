type Listener = (...args: any[]) => boolean | void

type Listeners = Map<string, Array<Listener>>

const validateEventName = (name: string): void | never => {
  if (name === '') {
    throw new TypeError('An event`s name cannot be empty')
  }
}

export default function (): void | never {
  const listeners: Listeners = new Map()

  const emit = (name: string, ...args: any): void => {
    validateEventName(name)

    if (!listeners.has(name)) {
      throw new TypeError(`An event ${name} does not exist`)
    }

    listeners.get(name)!.forEach(listener => listener(...args))
  }

  Object.assign(emit)
}
