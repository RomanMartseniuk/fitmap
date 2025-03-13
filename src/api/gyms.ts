const GetGymsNear = (pos: [number, number], radius=15000) => fetch(`/api/gyms/?at=${pos[0]},${pos[1]}&r=${radius}`);

export { GetGymsNear };
