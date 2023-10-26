class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  sayHello() {
    return `${this.name} says hello!`
  }

  visit(otherPerson) {
    return `${this.name} visited ${otherPerson.name}.`
  }

  switchVisit(otherPerson) {
    return otherPerson.visit(this)
  }

  update(obj) {
    if (typeof obj != 'object' || Array.isArray(obj)) {
      throw new TypeError("Input must be object!")
    }

    if (!obj.name || !obj.age) {
      throw new TypeError("must have age and name")
    }

    this.name = obj.name
    this.age = obj.age
  }

  tryUpdate(obj) {
    try {
      this.update(obj)
      return true
    } catch (e) {
      return false
    }
  }

  static greetAll(people) {
    if (!Array.isArray(people)) throw new Error
    for (const person of people) {
      if (!(person instanceof Person)) throw new Error
    }

    return people.map(person => person.sayHello())
  }
}

module.exports = Person;
