/* eslint-disable no-unused-vars */
import React from "react";
import { useBeforeUnload, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Recipesform.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function Recipesform() {
  const params = useParams();
  const [Categorieslist, setCategorieslist] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const navigate = useNavigate ();
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });
  useBeforeUnload(() => {
    localStorage.setItem("recipeData",JSON.stringify(getValues()));
    })

  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    // formData.append("name",data.name)
    // formData.append("description",data?.description)
    // formData.append("price",data?.price)
    // formData.append("tagId",data.tagId)
    // formData.append("recipeImage",data?.recipeImage[0])
    // formData.append("categoriesIds",data.categoriesIds)
    for (const key in data) {
      if (key !== "recipeImage") {
        formData.append(key, data[key]);
      } else {
        formData.append("recipeImage", data?.[key]?.[0]);
      }
    }
    try {
      const response = await axios[isNewRecipe? "post" : "put"](
        isNewRecipe
         ? "https://upskilling-egypt.com:3006/api/v1/Recipe/"
         :`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        formData,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      navigate("/dashboard/recipes/");
      console.log("Response:", response.data);
      toast.success("Recipe added successfully!");
    } catch (error) {
      toast.error("Error adding recipe");
    }
  };

  const recipeId = params.recipeId;
  const isNewRecipe = recipeId === "new-recipe"
  React.useEffect(() => {
    let getTages = async () => {
      try {
        let response = await axios.get(
          "https://upskilling-egypt.com:3006/api/v1/tag/"
        );
        console.log(response);
        setTags(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    let getCategorieslist = async () => {
      try {
        let response = await axios.get(
          " https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        setCategorieslist(response.data.data);
      } catch (error) {
        toast.error("Error fetching categories");
      }
    };
    (async () => {
       await getTages();
       await getCategorieslist();
        if (! isNewRecipe) {
          const getRecipe = async () => {
            const response = await axios.get(
              `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`
            );
            console.log(response);
            const recipe = response?.data;
            setValue("name", recipe?.name);
            setValue("description", recipe?.description);
            setValue("price", recipe?.price);
            setValue("tagId", recipe?.tag?.id);
            setValue("categoriesIds", recipe?.category?.[0].id);
          };
          getRecipe();
        }
    })();
  
  }, [recipeId,setValue]);

  return (
    <div>
      <header className={styles["header-wrapper"]}>
        <div className={styles["content-wrapper"]}>
          <h3>
            Fill the <span>Recipes</span> !
          </h3>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <Link to="/dashboard/recipes" className={styles["btn-primary"]}>
          All Recipes {""}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.9927 10.7075C20.9927 11.0168 20.8783 11.2827 20.6494 11.5054L14.5542 17.5913C14.4367 17.7088 14.313 17.7954 14.1831 17.8511C14.0532 17.9067 13.9202 17.9346 13.7842 17.9346C13.4749 17.9346 13.2214 17.8356 13.0234 17.6377C12.8255 17.446 12.7266 17.2048 12.7266 16.9141C12.7266 16.7656 12.7575 16.6265 12.8193 16.4966C12.875 16.3667 12.9523 16.2523 13.0513 16.1533L15.1294 14.0566L18.5156 10.9487L18.8867 11.5889L15.6118 11.7837H4.46045C4.13883 11.7837 3.87907 11.6847 3.68115 11.4868C3.47705 11.2889 3.375 11.0291 3.375 10.7075C3.375 10.3921 3.47705 10.1354 3.68115 9.9375C3.87907 9.73958 4.13883 9.64063 4.46045 9.64063L15.6118 9.64062L18.8867 9.83545L18.5156 10.4663L15.1294 7.36768L13.0513 5.271C12.9523 5.17204 12.875 5.05762 12.8193 4.92773C12.7575 4.79785 12.7266 4.65869 12.7266 4.51025C12.7266 4.21956 12.8255 3.97835 13.0234 3.78662C13.2214 3.5887 13.4749 3.48975 13.7842 3.48975C14.0625 3.48975 14.3161 3.60107 14.5449 3.82373L20.6494 9.91895C20.8783 10.1354 20.9927 10.3983 20.9927 10.7075Z"
              fill="white"
            />
          </svg>
        </Link>
      </header>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={styles["form-wrapper"]}
      >
        <div className={styles["input-wrapper"]}>
          <input
            {...register("name", { required: "this field is requried" })}
            placeholder="Recipe Name"
            className="form-control"
          />
          {errors.name?.message && (
            <div className="text-danger">{errors?.name?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <select
            {...register("tagId", { required: "this field is requried" })}
            className="form-control"
          >
            <option value="">Tag</option>
            {tags.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.tagId?.message && (
            <div className="text-danger">{errors?.tagId?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <input
            type="number"
            {...register("price", {
              required: "this field is requried",
              min: 0,
            })}
            placeholder="price"
            className="form-control"
          />
          {errors.price?.message && (
            <div className="text-danger">{errors?.price?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <select
            {...register("categoriesIds", {
              required: "this field is requried",
            })}
            className="form-control"
          >
            <option value="">Category</option>
            {Categorieslist.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.categoriesIds?.message && (
            <div className="text-danger">{errors?.categoriesIds?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <textarea
            {...register("description", { required: "this field is requried" })}
            placeholder="Descriptions"
            className="form-control"
          />
          {errors.description?.message && (
            <div className="text-danger">{errors?.description?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <input
            {...register("recipeImage")}
            className="form-control"
            type="file"
          />
          {errors.recipeImage?.message && (
            <div className="text-danger">{errors?.recipeImage?.message}</div>
          )}
        </div>
        <div className={styles["action-wrapper"]}>
          <Link to="/dashboard/recipes/" type="button" className={styles["btn-primary"]}>cancel</Link>
          <button disabled={isSubmitting} className={styles["btn-primary"]}>
            {isSubmitting ? "Saving ..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Recipesform;

