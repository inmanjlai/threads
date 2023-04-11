import { pb } from "$lib/pockebase";

export const load = async ({ params }) => {

  let thread;
  try {
    thread = await pb.collection('threads').getOne(params.id)
  } catch (err) {
    console.error(err)
  }


  return {
      id: params.id,
      thread
  }
}