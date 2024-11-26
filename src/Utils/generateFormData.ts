import { commomRes } from "../ReduxTool/Slice/Consumer/ConsumerActions";

export const GenerateFormData_pvapi = (file: any, inverter: commomRes, module: commomRes): FormData => {
    var formData = new FormData();

    let vmp = module.electrical.length && module.electrical[3].value
    let Imp = module.electrical.length && module.electrical[2].value
    let Voc = module.electrical.length && module.electrical[1].value
    let Isc = module.electrical.length && module.electrical[0].value
    let Pmp = module.electrical.length && module.electrical[4].value
    let nofCell = module.mechanicalCharacteristics.length && module.mechanicalCharacteristics[4].value

    formData.append("formFile", file as any); // Assuming "formFile" is a file input

    // Explicitly specify the types for the numerical values
    formData.append("Vmp", String(vmp));
    formData.append("Imp", String(Imp));
    formData.append("Voc", String(Voc));
    formData.append("Isc", String(Isc));
    formData.append("Pmp", String(Pmp));
    formData.append("T0", String(273 + 25));
    formData.append("N", String(nofCell));
    formData.append("Irr0", String(1000));
    // formData.append("bet", String(-0.27e-2));
    formData.append("bet", String(-0.331));
    formData.append("alp", String(0.772));
    formData.append("longitude", String(77.35));
    formData.append("latitude", String(28.65));  // need to chnage
    formData.append("standardlongitude", "None");
    formData.append("time_zone", String(5.5));
    formData.append("pv_tilt", String(15.0));
    formData.append("pv_azimuth", String(180));
    formData.append("albedo", String(0.20));
    formData.append("module_conversion_efficiency", String(0.211));
    formData.append("n_series", String(4));
    formData.append("n_parallel", String(24));
    formData.append("no_of_cbs", String(4));
    formData.append("no_of_dccs", String(1));
    formData.append("no_of_inverters", String(1));
    formData.append("no_of_trafos", String(1));
    formData.append("pv_layout", "landscape");
    formData.append("inverter_rating", String(33500000));
    formData.append("transformer_rating", String(18000000));
    formData.append("phase_angle", String(36.86));
    formData.append("diode_preference", String("double"));
    formData.append("design_pitch", String(7));
    formData.append("mms_length", String(4.5));
    formData.append("soiling_loss", String(0.015));
    formData.append("lid_loss", String(0.02));
    formData.append("quality_loss", String(0.005));
    formData.append("mismatch_loss", String(0.8));
    formData.append("module_year_plt_after_manufacture", String(1));
    formData.append("dc_initial_temp", String(293));
    formData.append("ac_initial_temp", String(363));
    formData.append("turns_ratio", String(47));
    formData.append("auxiliary_loss", String(0.006));
    formData.append("system_unavailability_loss", String(0.0185));
    formData.append("grid_limitation", String(156250000));
    formData.append("losses", null as any); // Assuming "losses" is a dynamic property

    formData.append("cable_initial_resistance_by_length_dc", String(0.00461));
    formData.append("cable_initial_resistance_by_length_ac", String(0.0059));
    formData.append("cable_reactance_ac", String(0.0000927));
    formData.append("bifacial_gain_factor", String(0.1));
    formData.append("rear_module_conversion_efficiency", String(0.2236));
    formData.append("integrate_bifacial_module", String(false));
    formData.append("totalTables", String(1844.4020307439189));
    formData.append("tableWidth", String(10));
    formData.append("totalPlantArea", String(124300));
    formData.append("moduleYearAfterManufacture", String(1));
    formData.append("length", String(5.0));
    formData.append("no_of_grid", String(1));

    // Assuming "inverter_temp_load" is an array property
    //formData.append("inverter_temp_load", String([359.0, 359.0, 343.0, 343.0, 312.0, 0.0]));

    // Now you can use the formData object for further processing, such as sending it in a POST request.
    return formData;
};


export const stringSizeObject = ({ inverter, module }: { inverter: commomRes, module : commomRes}) => {


    return {
        "wattage": parseInt(module.electrical[4].value),
        "minAmbTemp": -5,
        "maxAmbTemp": 48,
        "volTempCoffientVmpVoc": -0.28,
        "nominalOpenCircuitVoltage_VOC": parseInt(module.electrical[1].value),//49.48,
        "maxSystemVoltage": parseInt(inverter.electrical[3].value),//1500,
        "mpptInputRangeMin": parseInt(inverter.electrical[0].value),
        "mpptInputRangeMax": parseInt(inverter.electrical[1].value),
        "nominalShortCircuitCurrent_ISC":  parseInt(module.electrical[0].value) ,// 13.73,
        "nominalMaximumPowerVoltage_VMPP": parseInt(module.electrical[3].value),//40.87,
        "nominalMaximumPowerCurrent_IMPP": parseInt(module.electrical[2].value), //12.97,
        "maxGhi": 941,
        "minGhi": 12
      }
}


export const getSAMAPIObject = ({ inverter, module, noOfString, modulePerString, load, loadVal }: { inverter: commomRes, module: commomRes, noOfString: number, modulePerString: number, load: number, loadVal : boolean }) => {

     var inverterCount = Math.round((load / 1.25) / 3.3);

     const ModulePower = parseFloat(module?.electrical[4].value)

     var modifiedModuleString = modulePerString;
     const totalModule = Math.ceil(load / (ModulePower / 1000));

     if(loadVal){
         modifiedModuleString = modulePerString;
    
         if(modulePerString > totalModule){
            modifiedModuleString = totalModule
         }
     }

    // console.log(Math.floor(totalModule / modifiedModuleString))

    return {
        "trn": {
            "transformer_no_load_loss": "0",
            "transformer_load_loss": "0"
        },
        "arr": [
            {
                "System_design_nstrings":   Math.floor(totalModule / modifiedModuleString),
                "System_design_modules_per_string": Math.floor(modifiedModuleString),
                "System_design_mppt_input": 1,
                "System_design_tilt": 15,
                "System_design_tilt_eq_lat": 0,
                "System_design_azimuth": 0,
                "System_design_track_mode": 0,
                "System_design_rotlim": 45,
                "System_design_shade_mode": 0,
                "System_design_gcr": 0.3,
                "System_design_slope_tilt": 0,
                "System_design_slope_azm": 0,
                "System_design_rear_irradiance_loss": 0,
                "System_design_mismatch_loss": 2,
                "System_design_diodeconn_loss": 0.5,
                "System_design_dcwiring_loss": 1,
                "System_design_tracking_loss": 0,
                "System_design_nameplate_loss": 0,
                "System_design_mod_orient": 0,
                "System_design_nmodx": 7,
                "System_design_nmody": 2,
                "System_design_backtrack": 0,
                "System_design_enable": 0,
                "System_design_rear_soiling_loss": 0,
                "System_design_rack_shading": 0,
                "System_design_electrical_mismatch": 0,
                "System_design_monthly_tilt": [
                    40,
                    40,
                    40,
                    20,
                    20,
                    20,
                    20,
                    20,
                    20,
                    40,
                    40,
                    40
                ],
                "System_design1_soiling": [
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2
                ]
            }
        ],
        "user": {
            "User_Entered_Specifications_celltech": 1,
            "User_Entered_Specifications_vmp": 41.8,
            "User_Entered_Specifications_imp": 13.04,
            "User_Entered_Specifications_voc": 49.65,
            "User_Entered_Specifications_isc": 13.92,
            "User_Entered_Specifications_bvoc": -0.1427,
            "User_Entered_Specifications_aisc": 0.007719999999999999,
            "User_Entered_Specifications_gpmp": -0.331,
            "User_Entered_Specifications_nser": 72,
            "User_Entered_Specifications_area": 2.5560479999999997,
            "User_Entered_Specifications_tnoct": 46,
            "User_Entered_Specifications_standoff": 6,
            "User_Entered_Specifications_mounting": 0,
            "User_Entered_Specifications_is_bifacial": 0,
            "User_Entered_Specifications_bifacial_transmission_factor": 0.013,
            "User_Entered_Specifications_bifaciality": 0.7,
            "User_Entered_Specifications_bifacial_ground_clearance_height": 1,
            "User_Entered_Specifications_transient_thermal_model_unit_mass": 11.0919
        },
        "inv": {
            "Invertor_count": inverterCount,
            "Invertor_model": 1,
            "mppt_low_inverter": 80,
            "mppt_hi_inverter": 500,
            "Invertor_num_mppt": 1,
            "Invertor_snl_c0": -1.40704e-8,
            "Invertor_snl_c1": 6.345659,
            "Invertor_snl_c2": 0.001549,
            "Invertor_snl_c3": -0.00027,
            "Invertor_snl_paco": 753200,
            "Invertor_snl_pdco": 777216,
            "Invertor_snl_pnt": 122.55,
            "Invertor_snl_pso": 3714.14,
            "Invertor_snl_vdco": 615,
            "Invertor_snl_vdcmax": 820,
            "Invertor_snl_eff_cec": 99,
            "Invertor_snl_ds_paco": 3300,
            "Invertor_cec_cg_c0": -0.0000031752,
            "Invertor_cec_cg_c1": -0.0000512314,
            "Invertor_cec_cg_c2": 0.000983596,
            "Invertor_cec_cg_c3": -0.0015078,
            "Invertor_cec_cg_paco": 3800,
            "Invertor_cec_cg_pdco": 3928.11,
            "Invertor_cec_cg_pnt": 0.99,
            "Invertor_cec_cg_psco": 19.4484,
            "Invertor_cec_cg_vdco": 398.497,
            "Invertor_cec_cg_vdcmax": 600,
            "Invertor_cec_cg_eff_cec": 96.63639448965016,
            "Invertor_ds_paco": 3300,
            "Invertor_ds_eff": 97.5,
            "Invertor_ds_pnt": 0,
            "Invertor_ds_pso": 15,
            "Invertor_pd_paco": 4000,
            "Invertor_pd_pdco": 4210.526315789474,
            "Invertor_pd_pnt": 0,
            "Invertor_pd_vdco": 310,
            "Invertor_pd_vdcmax": 600,
            "Invertor_pd_eff": 95,
            "Invertor_ds_vdco": 310,
            "Invertor_ds_vdcmax": 600
        },
        "main": {
            "enable_interconnection_limit": 0,
            "grid_interconnection_limit_kwac": 100000,
            "en_batt": 0,
            "adjust": 0,
            "dc_adjust": 0,
            "module_model": 2,
            "module_aspect_ratio": 1.7,
            "dcoptimizer_loss": 0,
            "acwiring_loss": 1.5,
            "transmission_loss": 0,
            "en_snow_model": 0,
            "system_capacity": 3.2704319,
            "use_wf_albedo": 1,
            "irrad_mode": 0,
            "sky_model": 2,
            "enable_mismatch_vmax_calc": 0
        }
    }
}