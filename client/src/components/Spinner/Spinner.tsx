import { FunctionComponent } from "react";

interface SpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg'
}
 
const Spinner: FunctionComponent<SpinnerProps> = ({ size = 'lg'}) => {
    return <div className={`loading loading-spinner loading-${size}`}></div>
}
 
export default Spinner;