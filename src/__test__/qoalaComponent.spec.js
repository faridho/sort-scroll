import Qoala from "../components/Qoala"

describe("Component Test", () => {
    it('should have Qoala as name', () => {
        expect(Qoala.name).toBe('Qoala');
    })

    it('should the correct default data', () => {
        expect(typeof Qoala.data).toBe('function')
        const defaultData = Qoala.data()
        expect(defaultData.title).toBe('Qoala Test')
        expect(defaultData.filter).toEqual({
            color: "Color",
            city: "City",
        })
        expect(defaultData.loadingText).toBe('Loading...')
        expect(defaultData.users).toEqual([])
        expect(defaultData.limit).toBe(10)
        expect(defaultData.loading).toBeTruthy()

    })
})