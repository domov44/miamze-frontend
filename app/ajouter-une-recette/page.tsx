"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckCircle, Circle, Plus, Trash } from "lucide-react";
import { Check, ChevronsUpDown } from "lucide-react";
import { confirm } from "@/hooks/confirm/ConfirmGlobal";
import ImageUploader from "@/components/custom/ui/image-uploader";
import { fetchIngredients } from "../services/ingredient";
import { fetchCategories } from "../services/category";

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { getToken } from "../utils/auth";

interface Ingredient {
    id: number;
    name: string;
    quantity: string;
}

interface Step {
    title: string;
    description: string;
    duration: string;
    type: "preparation" | "cuisson";
}

interface Recipe {
    name: string;
    image: string;
    category: string;
    description: string;
    ingredients: Ingredient[];
    steps: Step[];
}

export default function AddRecipePage() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [categories, setCategories] = useState<{ id: number; label: string }[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [open, setOpen] = useState(false)
    const [selectedIngredientIndex, setSelectedIngredientIndex] = useState<number | null>(null)
    const [recipe, setRecipe] = useState<Recipe>({
        name: "",
        image: "",
        category: "",
        description: "",
        ingredients: [],
        steps: [],
    });

    const router = useRouter();

    const formSteps = [
        { id: 1, title: "Informations générales" },
        { id: 2, title: "Détails de la recette" },
        { id: 3, title: "Ingrédients" },
        { id: 4, title: "Étapes de préparation" }
    ];

    useEffect(() => {
        const getIngredients = async () => {
            try {
                const data = await fetchIngredients();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };

        getIngredients();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        getCategories();
    }, []);

    const isStepValid = (step: number): boolean => {
        switch (step) {
            case 1:
                return recipe.name.trim() !== "" && recipe.image.trim() !== "";
            case 2:
                return recipe.category.trim() !== "" && recipe.description.trim() !== "";
            case 3:
                return recipe.ingredients.length > 0 && recipe.ingredients.every(ingredient => ingredient.name.trim() !== "" && ingredient.quantity.trim() !== "");
            case 4:
                return recipe.steps.length > 0 && recipe.steps.every(st => st.title.trim() !== "" && st.description.trim() !== "" && st.duration.trim() !== "");
            default:
                return false;
        }
    };

    const canProceedToNextStep = () => {
        for (let i = 1; i <= currentStep; i++) {
            if (!isStepValid(i)) {
                return false;
            }
        }
        return true;
    };

    const nextStep = () => {
        if (canProceedToNextStep()) {
            setCurrentStep((prev) => prev + 1);
        } else {
            toast.error("Veuillez remplir tous les champs obligatoires avant de continuer.");
        }
    };

    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const goToStep = (step: number) => setCurrentStep(step);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { id: 0, name: "", quantity: "" }] });
    };

    const updateIngredient = (index: number, key: keyof Ingredient, value: string | number | null) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index] = { ...updatedIngredients[index], [key]: value };
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const removeIngredient = async (index: number) => {
        try {
            const confirmed = await confirm({
                title: "Voulez-vous vraiment supprimer cet ingrédient ?",
                content: "Cette ingrédient sera supprimé de la recette.",
            });

            if (confirmed) {
                setRecipe({
                    ...recipe,
                    ingredients: recipe.ingredients.filter((_, i) => i !== index),
                });
                toast.success("Ingrédient supprimé.");
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression de l'ingrédient.");
            console.error("Erreur lors de la suppression de l'ingrédient :", error);
        }
    };

    const addStep = () => {
        setRecipe({
            ...recipe,
            steps: [...recipe.steps, { title: "", description: "", duration: "", type: "preparation" }],
        });
    };

    const updateStep = (index: number, key: keyof Step, value: string | "preparation" | "cuisson") => {
        const updatedSteps = [...recipe.steps];

        if (key === "type" && (value === "preparation" || value === "cuisson")) {
            updatedSteps[index][key] = value;
        } else if (key !== "type") {
            updatedSteps[index][key] = value as Step[typeof key];
        }
        setRecipe({ ...recipe, steps: updatedSteps });
    };

    const removeStep = async (index: number) => {
        try {
            const confirmed = await confirm({
                title: "Voulez-vous vraiment supprimer cette étape ?",
                content: "Cette étape sera supprimée de la recette.",
            });

            if (confirmed) {
                setRecipe({
                    ...recipe,
                    steps: recipe.steps.filter((_, i) => i !== index),
                });
                toast.success("Etape supprimée.");
            }
        } catch (error) {
            toast.error("Erreur lors de la suppression de l'étape.");
            console.error("Erreur lors de la suppression de l'étape :", error);
        }
    };

    const submitRecipe = async () => {
        const recipeToSubmit = {
            label: recipe.name,
            categoryId: parseInt(recipe.category),
            image: "https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp",
            recipeIngredients: recipe.ingredients.map(ingredient => ({
                ingredientId: ingredient.id || 1,
                quantity: ingredient.quantity
            })),
            steps: recipe.steps.map(step => ({
                name: step.title,
                description: step.description,
                duration: parseInt(step.duration),
                preparation: step.type === "preparation"
            }))
        };

        console.log(JSON.stringify(recipeToSubmit, null, 2));

        const token = getToken();
        if (token) {
            try {
                const response = await fetch(`${apiUrl}/recipes`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(recipeToSubmit),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Recette ajoutée :', data);
                    toast.success("Recette ajoutée avec succès !");
                } else {
                    console.error('Erreur lors de l\'ajout de la recette:', response.statusText);
                    toast.error("Erreur lors de l'ajout de la recette !");
                }
            } catch (error) {
                console.error('Erreur réseau ou autre:', error);
                toast.error("Erreur lors de l'ajout de la recette !");
            }
        } else {
            console.error('Token manquant');
            toast.error("Token manquant, veuillez vous reconnecter !");
        }

        // router.push("/"); // Si tu veux rediriger après l'ajout de la recette
    };

    const renderStepIndicator = () => {
        return (
            <div className="flex items-center justify-between mb-8 px-2">
                {formSteps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center">
                        <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer
                                ${currentStep === step.id
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : currentStep > step.id
                                        ? "border-primary text-primary"
                                        : "border-gray-300 text-gray-300"
                                }`}
                            onClick={() => currentStep > step.id && goToStep(step.id)}
                        >
                            {currentStep > step.id ? (
                                <CheckCircle className="w-6 h-6" />
                            ) : (
                                step.id === currentStep ? (
                                    <span className="text-sm font-medium">{step.id}</span>
                                ) : (
                                    <Circle className="w-6 h-6" />
                                )
                            )}
                        </div>
                        <span className={`mt-2 text-xs font-medium ${currentStep === step.id ? "text-primary" : "text-gray-500"}`}>
                            {step.title}
                        </span>
                        {index < formSteps.length - 1 && (
                            <div className={`hidden sm:block absolute h-[2px] w-16 top-5 -z-10 
                                ${index < currentStep - 1 ? "bg-primary" : "bg-gray-200"}`}
                                style={{ left: `calc(${((2 * index) + 1) * (100 / (2 * formSteps.length))}% - 8px)` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-full py-10 px-4 bg-gray-50">
            <Card className="max-w-3xl w-full shadow-md">
                <CardHeader className="pb-8">
                    <CardTitle className="text-xl text-center pb-8">Ajouter une recette</CardTitle>
                    {renderStepIndicator()}
                </CardHeader>

                <CardContent className="pb-6">
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="text-sm font-medium">Nom de la recette</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={recipe.name}
                                    onChange={handleInputChange}
                                    placeholder="Nom de votre recette..."
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="image" className="text-sm font-medium">Image</Label>
                                <ImageUploader image={recipe.image} setImage={(newImage: string) => setRecipe({ ...recipe, image: newImage })} />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="category" className="text-sm font-medium">Catégorie</Label>
                                <Select
                                    value={recipe.category}
                                    onValueChange={(value) => setRecipe({ ...recipe, category: value })}
                                >
                                    <SelectTrigger id="category" className="mt-1">
                                        <SelectValue placeholder="Choisir une catégorie" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category: { id: number, label: string }) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={recipe.description}
                                    onChange={handleInputChange}
                                    placeholder="Décrivez votre recette en quelques mots..."
                                    className="mt-1 min-h-32"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Ingrédients</Label>
                            </div>

                            {recipe.ingredients.length === 0 ? (
                                <>
                                    <div className="text-center py-8 text-gray-500">
                                        Aucun ingrédient ajouté. Cliquez sur le bouton pour ajouter votre premier ingrédient.
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addIngredient}
                                    >
                                        <Plus /> Ajouter un ingrédient
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <div key={index} className="flex gap-2 items-center p-3 rounded-md border">
                                            <Popover
                                                open={open && selectedIngredientIndex === index}
                                                onOpenChange={(isOpen) => {
                                                    setOpen(isOpen);
                                                    if (isOpen) setSelectedIngredientIndex(index);
                                                }}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={open && selectedIngredientIndex === index}
                                                        className="w-[200px] justify-between"
                                                    >
                                                        {ingredient.name
                                                            ? ingredient.name
                                                            : "Choisir un ingrédient..."}
                                                        <ChevronsUpDown className="opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Rechercher un ingrédient..." className="h-9" />
                                                        <CommandList>
                                                            <CommandEmpty>Aucun ingrédient trouvé.</CommandEmpty>
                                                            <CommandGroup>
                                                                {ingredients.map((ingredient) => (
                                                                    <CommandItem
                                                                        key={ingredient.id}
                                                                        value={ingredient.id.toString()}
                                                                        onSelect={() => {
                                                                            updateIngredient(index, "id", ingredient.id);
                                                                            updateIngredient(index, "name", ingredient.name);
                                                                            setOpen(false);
                                                                        }}
                                                                    >
                                                                        {ingredient.name}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                recipe.ingredients[index]?.id === ingredient.id ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <div className="w-1/3">
                                                <Input
                                                    placeholder="Quantité"
                                                    value={ingredient.quantity}
                                                    onChange={(e) => updateIngredient(index, "quantity", e.target.value)}
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <Button
                                                    variant="ghost"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => removeIngredient(index)}
                                                >
                                                    <Trash /> Supprimer
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={addIngredient}
                                    >
                                        <Plus /> Ajouter un ingrédient
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium">Étapes de préparation</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addStep}
                                >
                                    <Plus /> Ajouter une étape
                                </Button>
                            </div>

                            {recipe.steps.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    Aucune étape ajoutée. Cliquez sur le bouton pour ajouter votre première étape.
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                    {recipe.steps.map((step, index) => (
                                        <div key={index} className="p-4 rounded-md border space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium">Étape {index + 1}</h3>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => removeStep(index)}
                                                >
                                                    <Trash /> Supprimer
                                                </Button>
                                            </div>

                                            <div>
                                                <Label htmlFor={`step-title-${index}`} className="text-xs">Titre</Label>
                                                <Input
                                                    id={`step-title-${index}`}
                                                    placeholder="Titre de l'étape"
                                                    value={step.title}
                                                    onChange={(e) => updateStep(index, "title", e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <Label htmlFor={`step-type-${index}`} className="text-xs">Type</Label>
                                                    <Select
                                                        value={step.type}
                                                        onValueChange={(value) => updateStep(index, "type", value as "preparation" | "cuisson")}
                                                    >
                                                        <SelectTrigger id={`step-type-${index}`} className="mt-1">
                                                            <SelectValue placeholder="Type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="preparation">Préparation</SelectItem>
                                                            <SelectItem value="cuisson">Cuisson</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div>
                                                    <Label htmlFor={`step-duration-${index}`} className="text-xs">Durée (min)</Label>
                                                    <Input
                                                        id={`step-duration-${index}`}
                                                        placeholder="Durée"
                                                        type="number"
                                                        value={step.duration}
                                                        onChange={(e) => updateStep(index, "duration", e.target.value)}
                                                        className="mt-1"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor={`step-description-${index}`} className="text-xs">Description</Label>
                                                <Textarea
                                                    id={`step-description-${index}`}
                                                    placeholder="Description détaillée de l'étape"
                                                    value={step.description}
                                                    onChange={(e) => updateStep(index, "description", e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-end gap-3 border-t pt-4 px-6">
                    <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                    >
                        Précédent
                    </Button>

                    {currentStep < formSteps.length ? (
                        <Button onClick={nextStep}>
                            Suivant
                        </Button>
                    ) : (
                        <Button onClick={submitRecipe}>
                            Enregistrer la recette
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}