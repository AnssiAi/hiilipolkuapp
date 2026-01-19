type ActiveStepProps = {
    steps: number;
    selected: number;
}

function ActiveStep({ steps, selected }: ActiveStepProps) {
    const arr: number[] = Array.from(Array(steps).keys()); 

    return (
        <div className="activeStepDisplay">
            {arr.map((item, index) => (
                index + 1 === selected ? (
                    <div className="step-active">{index+1}</div>
                ):
                (
                    <div className="step-inactive">{index+1}</div>
                )
            ))}
        </div>
    )
}

export default ActiveStep