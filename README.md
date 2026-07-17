## Updating the website

**Step 1:** Assuming that you already have the repo [cloned](https://lter.github.io/workshop-github/rstudio.html#cloning-a-repository) to your computer, make and save your changes to the .qmd files or any other file in RStudio. 

**Step 2:** Navigate to the **Build** tab in the upper right-hand corner. Click **Render Website**. The html files that make up the course website will be created momentarily.

**Step 3:** Navigate to the **Git** tab that is next to the **Build** tab. [Stage, commit, and push](https://lter.github.io/workshop-github/rstudio.html#workflow-refresher) those new html files to GitHub. 

**Step 4:** The website should be updated at https://yse-environmental-data-science.github.io/EDS_course/.

Note: to ensure a smooth experience building the site, make sure that your local repo looks like this:
```
EDS_course/
├── data/
│   ├── EDS_Course_Materials_README.pdf       
│   ├── Elevation.tif
│   ├── Elevation.tif.aux.json
│   ├── ENV720-MOD13A3-061-results.csv
│   ├── final_model.RDATA
│   ├── FLUXNET_FLUXES.RDATA
│   ├── FluxNet_Sites_2024.csv
│   ├── GlobalClimate.tif
│   ├── GlobalClimate.tif.aux.json
│   ├── GlobalSoil_grids.tif
│   ├── GlobalSoil_grids.tif.aux.json
│   ├── MODIS_IGBP_2001-2022_CT.tif
│   ├── MODIS_IGBP_2001-2022_CT.tif.aux.json
│   ├── MODIS_IGBP_2001-2022_CT.tif.aux.xml
│   ├── Monthly_Fluxes.RDATA
│   ├── RANDOMFOREST_DATASET.RDATA
│   ├── SensitivityProducts.RDATA
│   ├── TERRA_PPT_2021_CT.tif
│   ├── TERRA_TMEAN_2021_CT.tif   
│   ├── fluxnet_ch4.csv (see instructions below)
│   └── products/
│       ├── fluxnet_ch4.dbf (see instructions below)
│       ├── fluxnet_ch4.prj (see instructions below)
│       ├── fluxnet_ch4.shp (see instructions below)
│       ├── fluxnet_ch4.shx (see instructions below)
│       └── predictions/
│           ├── model_pred_m01.tif (see instructions below)
│           ├── ...
│           └── model_pred_m12.tif (see instructions below)
│
└── more_stuff/     
```
You can generate `fluxnet_ch4.csv` and the `fluxnet_ch4` shapefile by running `sf.qmd`. You can generate the `model_pred_m*.tif` files by running `spatial_projections.qmd`.
