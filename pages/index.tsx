import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl">
        <div className="text-2xl text-black">Hello World</div>
      </div>
    </div>
  )
}

export default Home
