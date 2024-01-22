import './App.css'
import BadSelect, {OptionProps} from "./components/bad-select/BadSelect.tsx";
import {useState} from "react";
import OkSelect from "./components/step-1/GoodSelect.tsx";
import GoodSelect from "./components/step-2/GoodSelect.tsx";

function App() {
    const [selected, setSelected] = useState<string|undefined>();
    const options: OptionProps[] = [
        {
            label: "Bad ARIA",
            value: "bad-aria"
        },
        {
            label: "No ARIA",
            value: "no-aria"
        }
    ];

    return (
        <main
            className={"h-screen flex items-center justify-center w-full max-w-screen-md mx-auto flex-col gap-8"}>
            <section className={"p-4 border border-red-400 rounded"} aria-labelledby={"bad-select"}>
                <h2 id={"bad-select"} className={"text-2xl font-bold text-red-500"}>Bad select</h2>
                <BadSelect onChange={setSelected} options={options} label={"Is better bad aria or no aria?"}/>
                <p>You chose: {selected}</p>
            </section>

            <section className={"p-4 border border-orange-400 rounded"} aria-labelledby={"ok-select"}>
                <h2 id={"ok-select"} className={"text-2xl font-bold text-orange-500"}>Ok select</h2>
                <OkSelect onChange={setSelected} options={options} label={"Is better bad aria or no aria?"}/>
                <p>You chose: {selected}</p>
            </section>

            <section className={"p-4 border border-green-400 rounded"} aria-labelledby={"good-select"}>
                <h2 id={"good-select"} className={"text-2xl font-bold text-green-500"}>Good select</h2>
                <GoodSelect onChange={setSelected} options={options} label={"Is better bad aria or no aria?"}/>
                <p>You chose: {selected}</p>
            </section>
        </main>
    )
}

export default App
