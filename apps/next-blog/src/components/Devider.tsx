import tw from 'tailwind-styled-components'
const Hr = tw.div`border-b border-[1.5px] border-gray-300 rounded-lg w-full max-w-sm`


export default function Devider() {
  return (
    <div className='flex flex-row w-full justify-center py-16'>
        <Hr/>
    </div>
  )
}


