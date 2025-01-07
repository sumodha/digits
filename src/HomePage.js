import "./HomePage.css";


function NumberButton({num}){
    return (
        <button className="numbers" >
             {num} </button>

    );

}

const HomePage = () => {
    return (
        <div>
            <table>
                <tr>
                    <td> <NumberButton num = "1" > </NumberButton></td>
                    <td> <NumberButton num = "2"> </NumberButton> </td>
                    <td> <NumberButton num = "3"> </NumberButton> </td>
                </tr>
                <tr>
                    <td> <NumberButton num = "4"> </NumberButton> </td>
                    <td> <NumberButton num = "5"> </NumberButton> </td>
                    <td> <NumberButton num = "6"> </NumberButton> </td>
                </tr>
            </table>
        </div>
    );
}

export default HomePage