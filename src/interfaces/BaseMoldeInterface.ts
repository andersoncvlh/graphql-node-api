import { ModelsInteface } from "./ModelsInterface";

export interface BaseMoldeInterface {

    /**
     * to create instance methods
     */
    prototype?;
    /**
     * method to associate a model with the other
     */
    associate?(models: ModelsInteface): void;
}
