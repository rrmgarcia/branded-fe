import React, { useState, useContext } from "react";
import { v4 as v4uuid } from "uuid";
import { ProfileContext } from "../models/providers/ProfileProvider";
import merchantModel from "../models/MerchantModel";
import { toast } from "react-hot-toast";

const PublishPage = () => {
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);
  const { userProfile, userProducts } = builderAndProduct;

  const handlePublish = async (event) => {
    event.preventDefault();
  
    try {
      if (userProfile && userProducts) {
        const newMerchantProfile = {
          userId: userProducts.userId || "",
          avatar: userProfile.avatar || "",
          title: userProfile.title || "",
          subtitle: userProfile.subtitle || "",
          description: userProfile.description || "",
          themeStyle: userProfile.themeStyle,
          bgImage: userProfile.bgImage,
          carouselImgs: userProfile.carouselImgs || [],
          carouselToggle: userProfile.carouselToggle || "",
          links: userProfile.links || {},
          products: userProducts.productDetails.map((product) => ({
            name: product.name || "",
            link: product.link || "",
            category: product.category || "",
            image: product.image || "",
          })),
        };
  
        // Check if a merchant profile with the same userId exists
        const existingMerchant = await merchantModel.getMerchantByUserId(
          newMerchantProfile.userId
        );
  
        if (existingMerchant) {
          // Update the existing merchant profile
          const updatedMerchant = await merchantModel.createOrUpdateMerchant(
            newMerchantProfile
          );
          if (updatedMerchant) {
            // Handle success
            toast.success("Merchant Page successfully updated!")
          } else {
            // Handle error updating the merchant profile
            toast.error("Unable to update Merchant Page.")
            console.error("Error updating existing merchant profile.");
          }
        } else {
          // Create a new merchant profile
          const newMerchant = await merchantModel.createOrUpdateMerchant(
            newMerchantProfile
          );
  
          if (newMerchant) {
            // Handle success
            toast.success("Merchant Page successfully created!")
          } else {
            // Handle error creating the new merchant profile
            toast.error("Unable to create Merchant Page.")
            console.error("Error creating new merchant profile.");
          }
        }
      }
    } catch (error) {
      toast.error("Unable to add product details.")
      console.error("Error adding product details:", error);
    }
  };
  
  

  return (
    <div>
      <button onClick={handlePublish}>Publish Page</button>
    </div>
  );
};

export default PublishPage;
