import { Button } from "react-bootstrap";

// dung de hien thi 1 category
const CategoryComponent = (props) => {
    const { category_id, category_name, clickUpdate, clickDel } = props;
    return (
            <tr style={{ textAlign: "center" }}>
                <td style={{ width: "100px", marginRight: "100px" }}>{category_id}</td>
                <td style={{ width: "200px", marginRight: "80px" }}>{category_name}</td>
                <td style={{ width: "250px", marginRight: "100px" }}>
                    <Button variant="warning" onClick={() => clickUpdate(category_id)}>
                        Update
                    </Button>
                    <Button className="ms-2" variant="danger" onClick={() => clickDel(category_id)}>
                        Delete
                    </Button>
                </td>
            </tr>

    );
};

export default CategoryComponent;