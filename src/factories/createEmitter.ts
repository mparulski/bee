interface ListenerDefinition {
  listener: Listener
  isOnce: boolean
}

type Listener = (...args: any[]) => boolean | void | never

type Listeners = Map<string, Array<ListenerDefinition>>

type Emit = (name: string, ...args: any) => void | never

type EmitMethods = {
  on: (name: string, listener: Listener) => any
}

type Emitter = Emit & EmitMethods

export default (): Emitter => {
  const listeners: Listeners = new Map()
  const queue: Map<string, any[]> = new Map()
  let isFire: boolean = false

  const validateEventName = (name: string): void | never => {
    if (name === '') {
      throw new TypeError('An event`s name cannot be empty')
    }
  }

  const checkEventExists = (name: string): void | never => {
    if (!listeners.has(name)) {
      throw new TypeError('An event does not exist')
    }
  }

  const fire = (): void | never => {
    const cloneQueue = new Map(queue)
    queue.clear()
    isFire = false

    cloneQueue.forEach((args, name) => {
      validateEventName(name)
      checkEventExists(name)

      const listenersToFire = listeners.get(name)!

      listenersToFire.forEach(listenerDefinition => {
        listenerDefinition.listener(...args)

        if (listenerDefinition.isOnce) {
          // removeListener(name, listenerDefinition.listener)
        }
      })
    })
  }

  const registerEventWithCallback: (args: {name: string; listener: Listener; isOnce: boolean}) => void | never = ({
    name,
    listener,
    isOnce,
  }) => {
    validateEventName(name)
    checkEventExists(name)

    const callbackDefinition = {
      listener,
      isOnce,
    }

    const eventListeners = listeners.get(name)!
    listeners.set(name, [...eventListeners, callbackDefinition])
  }

  const emit: Emit = (name, ...args) => {
    validateEventName(name)
    checkEventExists(name)

    queue.set(name, args)

    if (!isFire) {
      isFire = true
      Promise.resolve().then(() => fire())
    } else {
      //TODO setTimeout
    }
  }

  const emitterOperations = {
    on: function (name: string, listener: Listener) {
      registerEventWithCallback({name, listener, isOnce: false})

      return this
    },
  }

  return <Emitter>Object.assign(emit, emitterOperations)
}
