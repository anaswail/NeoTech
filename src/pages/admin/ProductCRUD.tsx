import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { ImageUp, X, Plus, Trash2, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { actAddProduct } from "@/store/slices/products/act/actAddProduct";
import Swal from "sweetalert2";
import { categoriesLevels } from "@/utils/Repeated";
import type { CategoryLevels } from "@/types";
import { actGetProductById } from "@/store/slices/products/act/actGetProductById";
import { useLocation } from "react-router";

// Types
interface Variation {
  id: string;
  price: string;
  comparePrice: string;
  stock: string;
  colorName: string;
  hex: string;
}

const ProductCRUD = () => {
  const dispatch = useDispatch<AppDispatch>();

  const productId = localStorage.getItem("productId");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productId) {
      setIsEditing(true);
      dispatch(actGetProductById({ id: productId }));
    }
  }, [productId]);

  const { data, loading } = useSelector((state: RootState) => state.productId);

  // Form basic fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Categories (3 levels) - using IDs
  const [selectedCategories, setSelectedCategories] = useState({
    level1: "",
    level2: "",
    level3: "",
  });
  const [availableLevel2, setAvailableLevel2] = useState<CategoryLevels[]>([]);
  const [availableLevel3, setAvailableLevel3] = useState<CategoryLevels[]>([]);

  // Images - store both File objects AND preview URLs
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  // Variations - dynamic array that can grow/shrink
  const [variations, setVariations] = useState<Variation[]>([
    {
      id: crypto.randomUUID(),
      price: "",
      comparePrice: "",
      stock: "",
      colorName: "",
      hex: "#000000",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ===== CATEGORY HANDLERS =====
  const handleLevel1Change = (value: string) => {
    setSelectedCategories({ level1: value, level2: "", level3: "" });

    // اجيب الـ subcategories بتاعت الـ level 1 المختار
    const selectedCategory = categoriesLevels.find((cat) => cat.id === value);
    setAvailableLevel2(selectedCategory?.subCategories || []);
    setAvailableLevel3([]);
  };

  const handleLevel2Change = (value: string) => {
    setSelectedCategories({ ...selectedCategories, level2: value, level3: "" });

    // اجيب الـ subcategories بتاعت الـ level 2 المختار
    const level2Category = availableLevel2.find((cat) => cat.id === value);
    setAvailableLevel3(level2Category?.subCategories || []);
  };

  const handleLevel3Change = (value: string) => {
    setSelectedCategories({ ...selectedCategories, level3: value });
  };

  // ===== IMAGE HANDLERS =====
  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Store the actual File object (this is what gets sent to backend)
      const newFiles = [...imageFiles];
      newFiles[index] = file;
      setImageFiles(newFiles);

      // Create preview URL for display
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    newFiles[index] = null;
    newPreviews[index] = null;
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  // ===== VARIATION HANDLERS =====
  const addVariation = () => {
    setVariations([
      ...variations,
      {
        id: crypto.randomUUID(),
        price: "",
        comparePrice: "",
        stock: "",
        colorName: "",
        hex: "#000000",
      },
    ]);
  };

  const removeVariation = (id: string) => {
    if (variations.length > 1) {
      setVariations(variations.filter((v) => v.id !== id));
    }
  };

  const updateVariation = (
    id: string,
    field: keyof Variation,
    value: string
  ) => {
    setVariations(
      variations.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  // ===== VALIDATION =====
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Basic fields
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.length > 50)
      newErrors.title = "Title must be at most 50 characters";
    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    // Category validation
    if (!selectedCategories.level1) {
      newErrors.category = "Please select at least main category";
    }

    // Validate each variation
    variations.forEach((v, idx) => {
      if (!v.price || Number(v.price) <= 0) {
        newErrors[`price-${idx}`] = "Required";
      }
      if (!v.stock || Number(v.stock) <= 0) {
        newErrors[`stock-${idx}`] = "Required";
      }
      if (!v.colorName.trim()) {
        newErrors[`colorName-${idx}`] = "Required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { error: addProductError } = useSelector(
    (state: RootState) => state.newProduct
  );

  // ===== SUBMIT HANDLER =====
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // 1. Add basic fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);

      // 2. Add category ID - send the most specific level selected (ID not name)
      const categoryId =
        selectedCategories.level3 ||
        selectedCategories.level2 ||
        selectedCategories.level1;
      formDataToSend.append("categoryId", categoryId);

      // 3. Add actual image File objects (NOT base64!)
      imageFiles.forEach((file) => {
        if (file) {
          formDataToSend.append("images", file);
        }
      });

      // 4. Add variations as JSON string
      const variationsData = variations.map((v) => ({
        price: Number(v.price),
        comparePrice: v.comparePrice ? Number(v.comparePrice) : undefined,
        stock: Number(v.stock),
        attributes: {
          color: {
            name: v.colorName,
            hex: v.hex,
          },
        },
      }));
      formDataToSend.append("variations", JSON.stringify(variationsData));

      // 5. Dispatch to Redux
      await dispatch(actAddProduct(formDataToSend)).unwrap();

      // Success handling
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Product Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      setFormData({ title: "", description: "" });
      setSelectedCategories({ level1: "", level2: "", level3: "" });
      setAvailableLevel2([]);
      setAvailableLevel3([]);
      setImageFiles([null, null, null, null]);
      setImagePreviews([null, null, null, null]);
      setVariations([
        {
          id: crypto.randomUUID(),
          price: "",
          comparePrice: "",
          stock: "",
          colorName: "",
          hex: "#000000",
        },
      ]);
    } catch (error: any) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: addProductError?.message || "Failed to create product",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (data && isEditing) {
      setFormData({
        title: data.title ?? "",
        description: data.description ?? "",
      });
      setVariations([
        {
          id: crypto.randomUUID(),
          price: data.minPrice?.toString() || "",
          comparePrice: data.maxPrice?.toString() || "",
          stock: data.totalStock?.toString() || "",
          colorName: "",
          hex: "#000000",
        },
      ]);
      const imageUrls = data.images?.map((img) => img.secure_url) || [];
      const filledPreviews = [
        ...imageUrls,
        ...Array(4 - imageUrls.length).fill(null),
      ];
      setImagePreviews(filledPreviews);
    }
  }, [data, productId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        {data && isEditing ? (
          <Heading title="Update Product" />
        ) : (
          <Heading title="Create Product" />
        )}
        <p className="mt-2 text-gray-600">Enter product details below</p>

        <form className="mt-8" onSubmit={handleAddProduct}>
          <div className="space-y-8">
            {/* ===== BASIC INFORMATION ===== */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-800">
                Basic Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter product title"
                  className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter product description"
                  rows={4}
                  className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors resize-none"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* ===== CATEGORY SELECTION (3 LEVELS) ===== */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-800">
                Category *
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Level 1: Main Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Category
                  </label>
                  <select
                    value={selectedCategories.level1}
                    onChange={(e) => handleLevel1Change(e.target.value)}
                    className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select main category...</option>
                    {categoriesLevels.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level 2: Sub Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub Category
                  </label>
                  <select
                    value={selectedCategories.level2}
                    onChange={(e) => handleLevel2Change(e.target.value)}
                    disabled={
                      !selectedCategories.level1 || availableLevel2.length === 0
                    }
                    className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select sub category...</option>
                    {availableLevel2.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level 3: Specific Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specific Model (Optional)
                  </label>
                  <select
                    value={selectedCategories.level3}
                    onChange={(e) => handleLevel3Change(e.target.value)}
                    disabled={
                      !selectedCategories.level2 || availableLevel3.length === 0
                    }
                    className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select model...</option>
                    {availableLevel3.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            {/* ===== PRODUCT IMAGES ===== */}
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-gray-800">
                Product Images (Up to 4)
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <label
                      htmlFor={`upload-${index}`}
                      className="cursor-pointer flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100"
                    >
                      {preview ? (
                        <>
                          <img
                            src={preview}
                            alt={`Product ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeImage(index);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <ImageUp size={24} />
                          <span className="text-xs mt-1">Upload Image</span>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(index, e)}
                      id={`upload-${index}`}
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ===== PRODUCT VARIATIONS (DYNAMIC) ===== */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Product Variations *
                </h2>
                <Button
                  type="button"
                  onClick={addVariation}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus size={16} className="mr-2" />
                  Add Variation
                </Button>
              </div>

              <div className="space-y-4">
                {variations.map((variation, idx) => (
                  <div
                    key={variation.id}
                    className="p-5 border-2 border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-700">
                        Variation {idx + 1}
                      </h3>
                      {variations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariation(variation.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Selling Price *
                        </label>
                        <input
                          type="number"
                          value={variation.price}
                          onChange={(e) =>
                            updateVariation(
                              variation.id,
                              "price",
                              e.target.value
                            )
                          }
                          placeholder="130"
                          className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors"
                        />
                        {errors[`price-${idx}`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`price-${idx}`]}
                          </p>
                        )}
                      </div>

                      {/* Compare Price */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Compare Price
                        </label>
                        <input
                          type="number"
                          value={variation.comparePrice}
                          onChange={(e) =>
                            updateVariation(
                              variation.id,
                              "comparePrice",
                              e.target.value
                            )
                          }
                          placeholder="150"
                          className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      {/* Stock */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock *
                        </label>
                        <input
                          type="number"
                          value={variation.stock}
                          onChange={(e) =>
                            updateVariation(
                              variation.id,
                              "stock",
                              e.target.value
                            )
                          }
                          placeholder="10"
                          className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors"
                        />
                        {errors[`stock-${idx}`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`stock-${idx}`]}
                          </p>
                        )}
                      </div>

                      {/* Color Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color Name *
                        </label>
                        <input
                          type="text"
                          value={variation.colorName}
                          onChange={(e) =>
                            updateVariation(
                              variation.id,
                              "colorName",
                              e.target.value
                            )
                          }
                          placeholder="Red"
                          className="w-full outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors"
                        />
                        {errors[`colorName-${idx}`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`colorName-${idx}`]}
                          </p>
                        )}
                      </div>

                      {/* HEX Color */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          HEX Color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={variation.hex}
                            onChange={(e) =>
                              updateVariation(
                                variation.id,
                                "hex",
                                e.target.value
                              )
                            }
                            className="w-6 h-12 rounded border-2 border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={variation.hex}
                            onChange={(e) =>
                              updateVariation(
                                variation.id,
                                "hex",
                                e.target.value
                              )
                            }
                            placeholder="#FF0000"
                            className="flex-1 outline-none p-3 border-2 rounded-md border-gray-300 focus:border-blue-500 transition-colors w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== SUBMIT BUTTON ===== */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-6 bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    {data && isEditing
                      ? "Updating Product..."
                      : "Creating Product..."}
                  </>
                ) : data && isEditing ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCRUD;
