import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const EditPost = () => {
	const [post, setPost] = useState(null);
	const { postId } = useParams();
	const token = useSelector((state) => state.token);

	const getPost = async () => {
		const response = await fetch(`http://localhost:3001/posts/${postId}`, {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setPost(data);
	};

	useEffect(() => {
		getPost();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (!post) return null;


  return (
	<div>EditPost</div>
  )
}

export default EditPost