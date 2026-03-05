async function testImport(path) {
    try {
        await import(path);
        console.log(`✅ Loaded: ${path}`);
    } catch (error) {
        console.error(`❌ Failed: ${path}`);
        console.error(error.message);
        // Don't exit, keep checking others
    }
}

async function run() {
    console.log('--- Testing Root Imports ---');
    await testImport('./src/constants.js');
    await testImport('./src/db/index.js');
    await testImport('./src/app.js');

    console.log('\n--- Testing Utils ---');
    await testImport('./src/utils/apiError.js');
    await testImport('./src/utils/apiResponse.js');
    await testImport('./src/utils/asyncHandler.js');
    await testImport('./src/utils/cloudinary.js');

    console.log('\n--- Testing Models ---');
    await testImport('./src/models/user.model.js');
    await testImport('./src/models/signal.model.js');

    console.log('\n--- Testing Services ---');
    await testImport('./src/services/nova.service.js');
    await testImport('./src/services/aggregation.service.js');

    console.log('\n--- Testing Middleware ---');
    await testImport('./src/middleware/auth.middleware.js');
    await testImport('./src/middleware/multer.middleware.js');

    console.log('\n--- Testing Routes ---');
    await testImport('./src/routes/user.route.js');
    await testImport('./src/routes/signal.route.js');
    await testImport('./src/routes/insight.route.js');
}

run();
