// import "../styles/CreateListing.scss"
// import Navbar from "../components/Navbar"
// import { categories, types } from "../data"

// const CreateListing = () => {
//     return (
//         <>
//             <Navbar />
//             <div className="create-listing">
//                 <h1>Publish Your Place</h1>
//                 <form>
//                     <div className="create-listing_step1">
//                         <h2>Step 1: Tell us about your place</h2>
//                         <hr />
//                         <h3>Which of these categories best describes your place? </h3>
//                         <div className="category-list">
//                             {categories?.map((item, index) => (
//                                 <div className="category" key={index}>
//                                     <div className="category_icon">{item.icon}</div>
//                                     <p>{item.label}</p>
//                                 </div>
//                             ))}

//                         </div>
//                         <h3>What type of place guests have?</h3>
//                         <div className="type_list">
//                             {types?.map((item, index) => (
//                                 <div className="type" key={index}>
//                                     <div className="type_text">
//                                         <h4>{item.name}</h4>
//                                         <p>{item.description}</p>
//                                     </div>
//                                     <div className="type_icon">{item.icon}</div>
//                                 </div>
//                             ))}
//                         </div>
//                         <h3>Where's your place located? </h3>
//                         <div className="full">
//                             <div className="location">
//                                 <p>Street Address</p>
//                                 <input type="text" placeholder="Street Address" name="streetAddress" required />
//                             </div>
//                         </div>

//                     </div>

//                     <div className="half">
//                         <div className="location">
//                             <p>Province</p>
//                             <input type="text" placeholder="Province" name="province" required />
//                         </div>
//                         <div className="location">
//                             <p>Country</p>
//                             <input type="text" placeholder="Country" name="country" required />
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default CreateListing

import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IoIosImages } from "react-icons/io"
import variables from "../styles/variables.scss"
import { useState } from "react";
import { BiTrash } from "react-icons/bi";

const CreateListing = () => {

    const [category , setCategory] = useState("")
    const [type , setType]  = useState("")
    const [amenities , setAmenities] = useState([])

    // this is for location section
    const [formLocation , setFormLocation] = useState({
        streetAddress : "",
        aptSuite: "",
        city: "",
        province: "",
        country:"",
    }) 

    const handleChangeLocation = (e) =>{
        const {name , value} = e.target
        setFormLocation({
            ...formLocation,
            [name]: value
        }) 
    }

    console.log(formLocation)

    //  UPLOAD , DRAG AND DROP REMOVE PHOTOS

    const [photos, setPhotos] = useState([])

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
    }

    const handleDrapPhoto = (result) => {
        if (!result.destination) return

        const items = Array.from(photos)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setPhotos(items)
    }

    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index != indexToRemove))
    }

    return (
        <>
            <Navbar />
            <div className="create-listing">
                <h1>Publish Your Place</h1>
                <form>
                    <div className="create-listing_step1">
                        <h2>Step 1: Tell us about your place</h2>
                        <hr />

                        <h3>Which of these categories best describes your place?</h3>
                        <div className="category-list">
                            {categories?.map((item, index) => (
                                <div className={`category ${category === item.label ? "selected" : ""}`} key={index} onClick={()=> setCategory(item.label)}>
                                    <div className="category_icon">{item.icon}</div>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>

                        <h3>What type of place guests have?</h3>
                        <div className="type-list">
                            {types?.map((item, index) => (
                                <div className={`type ${type=== item.name ? "selected" : ""}`} key={index} onClick={()=>setType(item.name)} >
                                    <div className="type_text">
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="type_icon">{item.icon}</div>
                                </div>
                            ))}
                        </div>

                        <h3>Where's your place located?</h3>

                        <div className="full">
                            <div className="location">
                                <p>Street Address</p>
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    name="streetAddress"
                                    value={formLocation.streetAddress}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
                        </div>

                        <div className="half">
                            <div className="location">
                                <p>Apartment, Suite, etc. (if applicable)</p>
                                <input type="text" placeholder="Apartment, Suite, etc. (if applicable) " name="aptSuite" value={formLocation.aptSuite}  onChange={handleChangeLocation}/>
                            </div>
                            <div className="location">
                                <p>City</p>
                                <input type="text" placeholder="City" name="city" value={formLocation.city} required  onChange={handleChangeLocation} />
                            </div>
                        </div>

                        <div className="half">
                            <div className="location">
                                <p>Province</p>
                                <input type="text" placeholder="Province" name="province" value={formLocation.province} required  onChange={handleChangeLocation}/>
                            </div>
                            <div className="location">
                                <p>Country</p>
                                <input type="text" placeholder="Country" name="country" value={formLocation.country} required  onChange={handleChangeLocation} />
                            </div>
                        </div>

                        <h3>Share some basics about your place </h3>
                        <div className="basics">
                            <div className="basic">
                                <p>Guests</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></RemoveCircleOutline>
                                    <p>1</p>
                                    <AddCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></AddCircleOutline>
                                </div>
                            </div>

                            <div className="basic">
                                <p>Bedrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></RemoveCircleOutline>
                                    <p>1</p>
                                    <AddCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></AddCircleOutline>
                                </div>
                            </div>

                            <div className="basic">
                                <p>Beds</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></RemoveCircleOutline>
                                    <p>1</p>
                                    <AddCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></AddCircleOutline>
                                </div>
                            </div>

                            <div className="basic">
                                <p>Bathrooms</p>
                                <div className="basic_count">
                                    <RemoveCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></RemoveCircleOutline>
                                    <p>1</p>
                                    <AddCircleOutline sx={{ fontSize: "25px", cursor: "pointer", "&:hover": { color: variables.pinkred } }}></AddCircleOutline>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="create-listing_step2">
                        <h2>Step2: Make your place stand out</h2>
                        <hr />

                        <h3>Tell guests what your place has to offer</h3>
                        <div className="amenities">
                            {facilities?.map((item, index) => (
                                <div className="facility" key={index}>
                                    <div className="facility icon">{item.icon}
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3>Add some photos of your place</h3>
                        <DragDropContext onDragEnd={handleDrapPhoto}>
                            <Droppable droppableId="photos" direction="horizontal" >
                                {(provided) => (
                                    <div className="photos" {...provided.droppableProps} ref={provided.innerRef} >
                                        {photos.length < 1 && (
                                            <>
                                                <input type="file" id="images" style={{ display: "none" }} accept="images/*" onChange={handleUploadPhotos} multiple />
                                                <label htmlFor="images" className="alone">
                                                    <div className="icon"><IoIosImages /></div>
                                                    <p>Upload from your device</p>
                                                </label>
                                            </>
                                        )}

                                        {photos.length >= 1 && (
                                            <>
                                                {photos.map((photo, index) => {
                                                    return (
                                                        <Draggable key={index} draggableId={index.toString()} index={index} >
                                                            {(provided) => (
                                                                <div className="photo" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                    <img src={URL.createObjectURL(photo)} alt="place" />
                                                                    <button type="button" onClick={() => handleRemovePhoto(index)} ><BiTrash /></button>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                                <input type="file" id="images" style={{ display: "none" }} accept="images/*" onChange={handleUploadPhotos} multiple />
                                                <label htmlFor="images" className="together">
                                                    <div className="icon"><IoIosImages /></div>
                                                    <p>Upload from your device</p>
                                                </label>
                                            </>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                       
                       <h3>What Make Your Place Attractive and exciting </h3>
                       <div className="description">
                        <p>Title</p>
                        <input type="text" placeholder="Title" name="title" required/>
                        <p>Description</p>
                        <textarea type="text" placeholder="Description" name="description" required/>
                        <p>Highlights</p>
                        <input type="text" placeholder="Highlights" name="highlights" required/>
                        <p>Highlights details</p>
                        <textarea type="text" placeholder="Highlights details" name="highlightDesc" required/>
                        <p>Now, set your PRICE</p>
                        <span>$</span>
                        <input type="number" name="price" placeholder="500" className="price" required />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateListing;
