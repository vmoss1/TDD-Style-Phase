const Person = require('../problems/person')
const chai = require('chai')
const expect = chai.expect
const spies = require('chai-spies')
chai.use(spies)

let person;
let name = 'Hao'
let age = 22

let person2;
let name2 = 'Veronica'
let age2 = 27

describe('Person', () => {
  beforeEach(() => {
    person = new Person(name, age)
    person2 = new Person(name2, age2)
  })

  describe('constructor()', () => {
    it('should be an instance of Person', () => {
      expect(person instanceof Person).to.equal(true)
    })

    it('should correctly set name and age property', () => {
      expect(person.age).to.equal(age)
      expect(person.name).to.equal(name)
    })
  })

  describe('sayHello()', () => {
    it(`return a string of the Person instance's name and a greeting message`, () => {
      expect(person.sayHello()).to.equal(`${name} says hello!`)
    })
  })

  describe('visit(otherPerson)', () => {
    it(`return a string stating that this instane visited the passed-in person instance`, () => {
      expect(person.visit(person2)).to.equal(`${name} visited ${name2}.`)
    })
  })

  describe('switchVisit(otherPerson)', () => {
    it(`should invoke the visit function of the parameter (otherPerson), passing in the current instance as the argument.`, () => {
      expect(person.switchVisit(person2)).to.equal(`${name2} visited ${name}.`)
      expect(person2.switchVisit(person)).to.equal(`${name} visited ${name2}.`)
    })
  })

  describe('update(obj)', () => {
    context('invalid object', () => {
      it('should throw TypeError if incoming argument is not an object', () => {
        const msg = "Input must be object!"
        expect(() => person.update(31)).to.throw(TypeError, msg)
        expect(() => person.update([])).to.throw(TypeError, msg)
      })

      it('should throw TypeError if incoming argument object does not have age and name property', () => {
        const msg = "must have age and name"
        expect(() => person.update({ name: '?' })).throw(TypeError, msg)
        expect(() => person.update({ age: '?' })).throw(TypeError, msg)
        expect(() => person.update({})).throw(TypeError, msg)
      })
    })

    context('valid object', () => {
      it('should correctly update current object', () => {
        expect(person.name).to.equal(name)
        expect(person.age).to.equal(age)
        person.update({ name: '?', age: '?' })
        expect(person.name).to.equal('?')
        expect(person.age).to.equal('?')
      })
    })
  })

  describe('tryUpdate(obj)', () => {
    context('successful update', () => {
      it('should return true on successful update', () => {
        expect(person.tryUpdate({ name: '?', age: '?' })).to.equal(true)
        expect(person2.tryUpdate({ name: '??', age: '??' })).to.equal(true)
      })
    })

    context('update fail', () => {
      it('should return false on unsuccessful update', () => {
        expect(person.tryUpdate({ age: '?' })).to.equal(false)
        expect(person.tryUpdate({ name: '?' })).to.equal(false)
        expect(person.tryUpdate({})).to.equal(false)
      })
    })
  })

  describe('static greetAll(obj)', () => {
    it('should throw TypeError for invalid input', () => {
      expect(() => Person.greetAll(0)).to.throw()
      expect(() => Person.greetAll([person, 1])).to.throw()
      expect(() => Person.greetAll([person, 1, person2])).to.throw()
    })

    it('should return an array of strings', () => {
      const result = Person.greetAll([person])
      expect(result).to.be.an.instanceof(Array)
      result.forEach(res => expect(typeof res == 'string').to.equal(true))
    })

    it('should called sayHello() on each person in the input array', () => {
      const sayHelloSpy = chai.spy.on(Person.prototype, "sayHello")
      Person.greetAll([person, person2])
      expect(sayHelloSpy).to.have.been.called.exactly(2)

      Person.greetAll([person])
      expect(sayHelloSpy).to.have.been.called.exactly(3)
    })

    it('should returns a list of greets from people', () => {
      expect(Person.greetAll([person, person2])).to.deep.equal([
        `${name} says hello!`,
        `${name2} says hello!`
      ])
      expect(Person.greetAll([person2, person])).to.deep.equal([
        `${name2} says hello!`,
        `${name} says hello!`
      ])
      expect(Person.greetAll([person])).to.deep.equal([
        `${name} says hello!`,
      ])
    })
  })
})
