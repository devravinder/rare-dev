
export const wait = async (time: number = 2000) => {
    await new Promise(resolve => setTimeout(resolve, time));
  }