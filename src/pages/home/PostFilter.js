// styles 
import styles from "./PostFilter.module.css"

const filterList = ["all", "selfie", "ceremony", "trip", "view", "exercise", "study", "cooking", "restaurant", "make up"];

export default function PostFilter({ currentFilter, changeFilter}) {
    const handleClick = (newFilter) => {
        changeFilter(newFilter);
    }

    return (
        <div className={ styles["posts-filter"] }>
            <nav>
                <p>Filter by：</p>
                { filterList.map((f) => (
                    <button key={ f }
                        onClick={ () => handleClick(f) }
                        style={ currentFilter === f ? { color:"var(--primary-color)" }: { color:"" } }
                    >{ f }</button>
                ))}
            </nav>
        </div>
    )
}
