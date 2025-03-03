const AudioPlayer = ({ audioUrl }: { audioUrl: string }) => {


    return (
        <div className="">
            <audio
                controlsList='nodownload'
                controls>
                <source src={audioUrl} />
                <source src={audioUrl} type="audio/mpeg" />
            </audio>


        </div>
    );
};

export default AudioPlayer