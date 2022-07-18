export function Banner(props: any) {
    return (
        <>
            <div className='w-full h-auto p-8 text-center text-white bg-slate-700'>
                <h1 className='text-4xl pb-3'>{props.title}</h1>
                <h4 className='text-xl'>{props.body}</h4>
            </div>
        </>
    );
}
